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
    }
};

export const getRatingForStack = (id) => {
    // Equivalent of calling /emission/stack/<id> (and selecting the contents of "data" in the response)
    return Math.random() * 100;
};