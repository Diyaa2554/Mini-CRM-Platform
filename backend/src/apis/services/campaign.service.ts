import Campaign from "../../models/Campaign";


export async function createCampaignService( 
    userId: string,
    name: string,
    ruleId: string,
    customerIds: string[],
    message: string,
    intent?: string
) {
try{
    const newCampaign = await Campaign.create({
        userId,
        name,
        ruleId,
        customerIds,
        message,
        intent,
    });

    return newCampaign;
}
catch (error) {
    console.error("Error creating campaign:", error);
    return null;
}

}