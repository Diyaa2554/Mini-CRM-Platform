import { Router } from 'express';
import multer from 'multer';
import { uploadCustomersController, uploadOrdersController } from '../controllers/upload.controller';
import { handleError } from '../../utils/response'; 
import { isAuthenticated } from '../../middlewares/auth.middleware';


const router = Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });



router.route("/customers").post(
  isAuthenticated, 
  upload.single('file'),
  handleError(uploadCustomersController)
);

router.route("/orders").post(
  isAuthenticated, 
  upload.single('file'),
  handleError(uploadOrdersController)
);

export default router;