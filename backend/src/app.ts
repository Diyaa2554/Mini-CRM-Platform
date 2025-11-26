import cors from 'cors';
import express, {Express} from 'express';
import { setupSwagger } from './docs/swagger';

import userRouter from './apis/routes/user.route';
import uploadRouter from './apis/routes/upload.route';
import customerRouter from './apis/routes/customers.route';
import orderRouter from './apis/routes/orders.route';
import campaignRouter from './apis/routes/campaign.route';
import segmentRulesRouter from './apis/routes/segmentRules.route';

const app: Express = express();

app.use(cors({
    origin : "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users",userRouter)
app.use("/api/uploads", uploadRouter)
app.use("/api/customers", customerRouter)
app.use("/api/orders", orderRouter)
app.use("/api/campaigns", campaignRouter)
app.use("/api/segmentRules", segmentRulesRouter)

setupSwagger(app);

export default app;