import SegmentRule from "../../models/SegmentRule";

export async function createSegmentRuleService(userId: string,
    logicType: string,
    conditions: any[]
) {
    try {
        
        const newSegmentRule = new SegmentRule({
            userId,
            logicType,
            conditions
        });

        const savedSegmentRule = await newSegmentRule.save();
        return savedSegmentRule;
     
    } catch (error) {
        console.error("Error creating segment rule:", error);
        throw new Error("Error creating segment rule");
    }
}

export async function getAllSegmentRulesService(userId: string) {
    try {
        const segmentRules = await SegmentRule.find({ userId });
        if (!segmentRules || segmentRules.length === 0) {
            return null;
        }
        return segmentRules;
    } catch (error) {   
        console.error("Error fetching segment rules:", error);
        throw new Error("Error fetching segment rules");
    }
}
