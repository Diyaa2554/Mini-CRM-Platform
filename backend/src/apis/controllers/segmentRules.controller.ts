import { AuthenticatedRequest } from "../../interfaces/interfaces";
import { error, success } from "../../utils/response";
import { createSegmentRuleService, getAllSegmentRulesService } from "../services/segmentRules.service";


export async function createSegmentRule(req: AuthenticatedRequest) {
    const {user} = req;
    const { logicType, conditions} = req.body;

    const newSegmentRule = await createSegmentRuleService(user!.id, logicType, conditions);

    if (!newSegmentRule) {
        return success({
            message: "Error creating segment rule",
        }, 500)
    }
    

    return success({
        message: "Segment rule created successfully",
    }
    , 200)
}

export async function getAllSegmentRules(req: AuthenticatedRequest) {
    const {user} = req;
    const segmentRules = await getAllSegmentRulesService(user!.id);
    if (!segmentRules || segmentRules.length === 0) {
        return error(
            "No segment rules found"
        , 404)
    }
    if (!segmentRules) {
        return success({
            message: "Error fetching segment rules",
        }, 500)
    }
    

    return success({
        message: "Segment rules fetched successfully",
        segmentRules: segmentRules
    }
    , 200)
}