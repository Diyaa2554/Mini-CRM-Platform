import { Response } from 'express'; // Ensure Response is imported if using it in signature
import { success, error } from '../../utils/response';
import { processCustomerRow, processOrderRow } from '../services/upload.service';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { Types } from 'mongoose';
import { AuthenticatedRequest, ICustomer } from '../../interfaces/interfaces';

export async function uploadCustomersController(req: AuthenticatedRequest, res: Response): Promise<{ // Added res and explicit return type
    status: number;
    success: boolean;
    response: any;
}> {
  return new Promise((resolve) => { 
    if (!req.file) {
      resolve(error("No customer file uploaded.", 400));
      return;
    }
    if (!req.user || !req.user.id) {
      resolve(error("User not authenticated.", 401));
      return;
    }

    const userId = new Types.ObjectId(req.user.id);
    const results: any[] = [];
    const errors: any[] = [];
    let rowCount = 0;

    const readableStream = Readable.from(req.file.buffer.toString('utf-8'));

    readableStream
      .pipe(csvParser())
      .on('data', async (data) => {
        rowCount++;
        try {
          const processedCustomer = await processCustomerRow(data, userId);
          results.push(processedCustomer);
        } catch (e: any) {
          errors.push({ row: rowCount, data, message: e.message });
        }
      })
      .on('end', () => {
        if (errors.length > 0) {
          resolve(success({ 
            message: `Customers file processed with some errors. ${results.length} processed, ${errors.length} failed.`,
            processedCount: results.length,
            failedCount: errors.length,
            failures: errors,
          }, 207));
        } else {
          resolve(success({ message: "Customers file processed successfully.", count: results.length, results }, 200)); // Resolve the outer promise
        }
      })
      .on('error', (err) => {
        console.error("CSV parsing error:", err);
        resolve(error("Error processing CSV file.", 500)); 
      });

  
  });
}


export async function uploadOrdersController(req: AuthenticatedRequest, res: Response): Promise<{
    status: number;
    success: boolean;
    response: any;
}> {
    return new Promise((resolve) => {
        if (!req.file) {
            resolve(error("No order file uploaded.", 400));
            return;
        }
        if (!req.user || !req.user.id) {
            resolve(error("User not authenticated.", 401));
            return;
        }

        const userId = new Types.ObjectId(req.user.id);
        const results: any[] = [];
        const errors: any[] = [];
        let rowCount = 0;
        const customerCache = new Map<string, ICustomer>();

        const readableStream = Readable.from(req.file.buffer.toString('utf-8'));

        readableStream
            .pipe(csvParser())
            .on('data', async (data) => {
                rowCount++;
                try {
                    const processedOrder = await processOrderRow(data, userId, customerCache);
                    if (processedOrder) {
                        results.push(processedOrder);
                    } else {
                        errors.push({ row: rowCount, data, message: "Customer not found for order." });
                    }
                } catch (e: any) {
                    errors.push({ row: rowCount, data, message: e.message });
                }
            })
            .on('end', () => {
                if (errors.length > 0) {
                    resolve(success({
                        message: `Orders file processed with some errors. ${results.length} processed, ${errors.length} failed.`,
                        processedCount: results.length,
                        failedCount: errors.length,
                        failures: errors,
                    }, 207));
                } else {
                    resolve(success({ message: "Orders file processed successfully.", count: results.length, results }, 200));
                }
            })
            .on('error', (err) => {
                console.error("CSV parsing error:", err);
                resolve(error("Error processing CSV file.", 500));
            });

    });
}

