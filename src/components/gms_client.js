
export const getStacks = () => {
    // Equivalent of calling /stack (and selecting the contents of "data" in the response)
    return [
        {
            "id": 54459606,
            "name": "arn:aws:cloudformation:eu-west-3:254306680133:stack/uoZZyTPSzShl/5a79f0a3-5227-4677-b59b-f0b4c985ed6a",
            "region": "eu-west-1",
        },
        {
            "id": 46714528,
            "name": "arn:aws:cloudformation:me-south-1:254306680133:stack/hfUgYXSEJaTO/30182b83-640c-41b5-b9cf-54269997dde7",
            "region": "me-south-1",
        },
        {
            "id": 56860439,
            "name": "arn:aws:cloudformation:cn-north-1:254306680133:stack/cSvVRKtogjbc/68ce5c42-73c3-4c95-bcbc-9584d4116cce",
            "region": "eu-north-1",
        },
        {
            "id": 29907807,
            "name": "arn:aws:cloudformation:ap-southeast-3:254306680133:stack/VllfdBOuXiTh/81e8d361-ec9f-4e94-95f6-86fc06a6e7b5",
            "region": "ap-southeast-3",
        },
        {
            "id": 33379124,
            "name": "arn:aws:cloudformation:eu-west-1:254306680133:stack/aNvwRCIrfZid/a85a9928-7b65-4b6e-a46c-729c00943e28",
            "region": "eu-west-1",
        },
        {
            "id": 66677562,
            "name": "arn:aws:cloudformation:us-east-2:254306680133:stack/jDeleDoxdcVz/644004d5-b1a8-409a-8772-65b01de1d03e",
            "region": "us-east-2",
        },
        {
            "id": 58113447,
            "name": "arn:aws:cloudformation:us-west-1:254306680133:stack/vtcFLAFPkvfb/1a80e904-bbbf-4253-bc60-b1a4df404e85",
            "region": "us-west-1"
        },
        {
            "id": 34045983,
            "name": "arn:aws:cloudformation:eu-west-3:254306680133:stack/rTchOzyspEEx/ca5253a8-eb46-4023-ad56-c7c2cfc1a2fc",
            "region": "eu-west-3",
        },
        {
            "id": 22307571,
            "name": "arn:aws:cloudformation:eu-south-1:254306680133:stack/LifjdgmIKYse/7da44f67-2072-4776-862a-ee1994fb2e15",
            "region": "eu-south-1",
        }
    ]
};

export const getStackDetails = (id) => {
    // Equivalent of calling /stack/<id> (and selecting the contents of "data" in the response)
    if (id === 54459606) {
        return {
            "id": 54459606,
            "name": "arn:aws:cloudformation:eu-west-3:254306680133:stack/uoZZyTPSzShl/5a79f0a3-5227-4677-b59b-f0b4c985ed6a",
            "region": "eu-west-1",
            "resources": [
                {
                    "id": 78325041,
                    "name": "SkZQdTAHcARO",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 97213064,
                    "name": "uYPArJgzBSTD",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 46714528) {
        return {
            "id": 46714528,
            "name": "arn:aws:cloudformation:me-south-1:254306680133:stack/hfUgYXSEJaTO/30182b83-640c-41b5-b9cf-54269997dde7",
            "region": "me-south-1",
            "resources": [
                {
                    "id": 79559749,
                    "name": "DVHPCjshiHfd",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 53529061,
                    "name": "wIrdSxRgbnfP",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 12901492,
                    "name": "hVlGEZcemkOx",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 97376815,
                    "name": "pbJJPbcqABHP",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 56860439) {
        return {
            "id": 56860439,
            "name": "arn:aws:cloudformation:cn-north-1:254306680133:stack/cSvVRKtogjbc/68ce5c42-73c3-4c95-bcbc-9584d4116cce",
            "region": "eu-north-1",
            "resources": [
                {
                    "id": 76053756,
                    "name": "eCXjngquOkOQ",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 84473432,
                    "name": "gnVuxIdUSQyG",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 73232969,
                    "name": "CSdcBwZaEvUW",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 58994075,
                    "name": "DAGAAKclywIN",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 6845937,
                    "name": "ChQdkdPjKqBS",
                    "resourceType": "AWS::EC2::Instance",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 29907807) {
        return {
            "id": 29907807,
            "name": "arn:aws:cloudformation:ap-southeast-3:254306680133:stack/VllfdBOuXiTh/81e8d361-ec9f-4e94-95f6-86fc06a6e7b5",
            "region": "ap-southeast-3",
            "resources": [
                {
                    "id": 42741509,
                    "name": "EUFiTCFRIfcG",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 31190025,
                    "name": "UmCtFdusHhbq",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 15999291,
                    "name": "DLvkYwjKWZTw",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 33379124) {
        return {
            "id": 33379124,
            "name": "arn:aws:cloudformation:eu-west-1:254306680133:stack/aNvwRCIrfZid/a85a9928-7b65-4b6e-a46c-729c00943e28",
            "region": "eu-west-1",
            "resources": [
                {
                    "id": 13170750,
                    "name": "CTCGyQcKQslx",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 14460776,
                    "name": "YyimWBIUHaVv",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 22651239,
                    "name": "qykJDTYUSjus",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 66677562) {
        return {
            "id": 66677562,
            "name": "arn:aws:cloudformation:us-east-2:254306680133:stack/jDeleDoxdcVz/644004d5-b1a8-409a-8772-65b01de1d03e",
            "region": "us-east-2",
            "resources": [
                {
                    "id": 64399886,
                    "name": "OnPDePdGIenp",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 44136763,
                    "name": "xMBTEWDKqwHW",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 76961203,
                    "name": "SLlKpCRhdyxQ",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 10646777,
                    "name": "LibkRUgHNcrc",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        }
    } else if (id === 58113447) {
        return {
            "id": 58113447,
            "name": "arn:aws:cloudformation:us-west-1:254306680133:stack/vtcFLAFPkvfb/1a80e904-bbbf-4253-bc60-b1a4df404e85",
            "region": "us-west-1",
            "resources": [
                {
                    "id": 24821538,
                    "name": "bIFnFdgIOTcv",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 90613588,
                    "name": "VkkNHtUENWWp",
                    "resourceType": "AWS::EKS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 34045983) {
        return {
            "id": 34045983,
            "name": "arn:aws:cloudformation:eu-west-3:254306680133:stack/rTchOzyspEEx/ca5253a8-eb46-4023-ad56-c7c2cfc1a2fc",
            "region": "eu-west-3",
            "resources": [
                {
                    "id": 3365152,
                    "name": "DgersfVBacFH",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 59904431,
                    "name": "XabelxqiyHcV",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    } else if (id === 22307571) {
        return {
            "id": 22307571,
            "name": "arn:aws:cloudformation:eu-south-1:254306680133:stack/LifjdgmIKYse/7da44f67-2072-4776-862a-ee1994fb2e15",
            "region": "eu-south-1",
            "resources": [
                {
                    "id": 35532295,
                    "name": "CoHEuMkobDCV",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                },
                {
                    "id": 89684109,
                    "name": "RUVhZkAiVbap",
                    "resourceType": "AWS::ECS::Cluster",
                    "status": "CREATE_COMPLETE"
                }
            ]
        };
    }
};

let values = {};
// Equivalent of calling /emission/stack/<id> (and selecting the contents of "data" in the response)
export const getRatingForStack = (id) => {
    if (id == null) {
        throw new Error("Id cannot be null");
    }
    if (values[id] != null) {
        return values[id];
    }
    const rating = Math.random() * 400 + 200;
    values[id] = rating;
    return rating;
};
