
import axios from "axios";
import { getData } from "./localStorage";
const baseUrl = 'http://backend.unknownchats.com/';

export async function getPostsInBatchApi({ batchNo = 1, batchSize = 25, currentDateTime = new Date() }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}getPostsInBatch/`,
            {
                batchNo: batchNo,
                batchSize: batchSize,
                datatime: currentDateTime,
            },
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${await getData('token')}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function likePostByUserIdApi({ id, type }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}likePostByUserId/`,
            {
                id: id,
                type: type
            },
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${await getData('token')}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}