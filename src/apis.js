
import axios from "axios";
import { getData } from "./localStorage";
// const baseUrl = 'http://backend.unknownchats.com/';
const baseUrl = 'http://10.0.2.2:8000/';

// Seekers section
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
export async function deleteReplyByIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}deleteReplyById/`,
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
export async function deletePostByIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}deletePostById/`,
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
export async function addNewPostApi({ postText, tagList }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}addNewPost/`,
            {
                postDescription: postText,
                tags: tagList,
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
export async function getTagsBySearchKeyApi({ searchKey }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}getTagsBySearchKey/`,
            {
                searchKey: searchKey,
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
export async function getMyPopularTagsApi() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}getMyPopularTags/`,
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

// Experts section
export async function getExpertsProfilesInBatchApi({ batchNo = 1, batchSize = 25, currentDateTime = new Date(), searchKey=false }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}getExpertsProfilesInBatch/`,
            {
                searchKey: searchKey,
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
export async function getSavedExpertsProfilesInBatchApi({ batchNo = 1, batchSize = 25, currentDateTime = new Date(), searchKey=false }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}getSavedExpertsProfilesInBatch/`,
            {
                searchKey: searchKey,
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
export async function starAnExpertPostByUserIdApi({ id, type }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}starAnExpertPostByUserId/`,
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
export async function messageCountToExpertPostByUserIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}messageCountToExpertPostByUserId/`,
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
export async function addExpertToFavouriteListApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}addExpertToFavouriteList/`,
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
export async function getFullExpertsProfileByIdApi({ id }) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}getFullExpertsProfileById/`,
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