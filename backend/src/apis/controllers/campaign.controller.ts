import { AuthenticatedRequest } from "../../interfaces/interfaces";
import { error, success } from "../../utils/response";
import { createCampaignService } from "../services/campaign.service";

export async function createCampaign(req: AuthenticatedRequest){
    const { name, ruleId, customerIds, message, intent} = req.body;
    const {user} = req;
    if(!name || !ruleId || !customerIds || !message ){
        return error("Please provide all required fields"
        , 400)
    }

    const newCampaign = await createCampaignService(user!.id, name, ruleId, customerIds, message, intent);
    if (!newCampaign) {
        return error("Error creating campaign", 500)
    }

    
    console.log(name, ruleId, customerIds, message, intent);



    return success({
        message: "Campaign created successfully",
        campaign: newCampaign
    }, 200)
}