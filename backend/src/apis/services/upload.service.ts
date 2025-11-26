import Customer from '../../models/Customer';
import Order from '../../models/Order';
import { Types } from 'mongoose';
import { ICustomer, IOrder }  from '../../interfaces/interfaces';

interface CustomerCsvRow {
  customer_external_id?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

interface OrderCsvRow {
  order_external_id?: string;
  customer_identifier: string; 
  items_description: string;
  total_amount: string; 
  order_date: string;  
}

export async function processCustomerRow(row: CustomerCsvRow, userId: Types.ObjectId): Promise<ICustomer> {
  const { customer_external_id, name, email, phone, location } = row;

 
  let query: any = { userId };
  if (customer_external_id) {
    query.externalId = customer_external_id;
  } else {
    query.email = email; 
  }

  const customerData = {
    userId,
    name,
    email,
    phone: phone || undefined,
    location: location || undefined,
    externalId: customer_external_id || undefined,
  };

  const existingCustomer = await Customer.findOne(query);
  if (existingCustomer) {
    Object.assign(existingCustomer, customerData);
    return existingCustomer.save();
  } else {
  
    if (!customer_external_id) {
        const emailCheck = await Customer.findOne({ email, userId });
        if (emailCheck) {
            
            Object.assign(emailCheck, customerData);
            return emailCheck.save();
        }
    }
    return Customer.create(customerData);
  }
}

export async function processOrderRow(row: OrderCsvRow, userId: Types.ObjectId, customerCache: Map<string, ICustomer>): Promise<IOrder | null> {
  const { order_external_id, customer_identifier, items_description, total_amount, order_date } = row;

  let customer: ICustomer | undefined | null = customerCache.get(customer_identifier); // customer can be ICustomer | undefined here

  if (!customer) { 
    const foundCustomer = await Customer.findOne({ // foundCustomer can be ICustomer | null
      userId,
      $or: [{ email: customer_identifier }, { externalId: customer_identifier }],
    });
    if (foundCustomer) { //not null
        customer = foundCustomer;
    }
    
  }

 
  if (!customer) {
    console.warn(`Customer not found for identifier: ${customer_identifier}. Skipping order ${order_external_id || 'N/A'}.`);
    return null; 
  }
  
  
  if (!customerCache.has(customer_identifier)) {
    customerCache.set(customer_identifier, customer);
  }
 
  if (customer.email && customer.email !== customer_identifier && !customerCache.has(customer.email)) {
    customerCache.set(customer.email, customer);
  }
  if (customer.externalId && customer.externalId !== customer_identifier && !customerCache.has(customer.externalId)) {
    customerCache.set(customer.externalId, customer);
  }

  const orderData = {
    userId,
    customerId: customer._id,
    items: items_description ? [items_description] : [],
    amount: parseFloat(total_amount),
    orderDate: new Date(order_date),
    externalId: order_external_id || undefined,
  };

  let orderQuery: any = { userId, customerId: customer._id };
   if (order_external_id) {
    orderQuery.externalId = order_external_id;
  } else {
    
    return Order.create(orderData);
  }

  const existingOrder = await Order.findOne(orderQuery);
  if (existingOrder) {
    Object.assign(existingOrder, orderData);
    return existingOrder.save();
  } else {
    return Order.create(orderData);
  }
}