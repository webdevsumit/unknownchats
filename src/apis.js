
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
export async function messageCountToPostByUserIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}messageCountToPostByUserId/`,
            {
                id: id,
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
export async function rejectionCountToPostByUserIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}rejectionCountToPostByUserId/`,
            {
                id: id,
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
export async function savePostByUserIdApi({ id, type }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}savePostByUserId/`,
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
export async function getRepliesByPostIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}getRepliesByPostId/`,
            {
                id: id,
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
export async function addNewReplyToPostApi({ id, reply }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}addNewReplyToPost/`,
            {
                id: id,
                reply: reply,
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