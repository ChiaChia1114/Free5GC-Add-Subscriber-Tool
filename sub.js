// Subscriber to mongo db
const myForm = document.getElementById("myForm");
const mydelete = document.getElementById("mydelete");
const Config_button = document.getElementById("config_btn");
const Done = document.getElementById("ConfigForm");
const ConfigContainer = document.getElementById("config_container");

NoneConfigContainer();
//#region Subscribe
myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Type your range
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;

    let IPaddress = document.getElementById("URL").value;
    let PlmnID = document.getElementById("PlmnID").value;
    let authenticationMethod = document.getElementById("authenticationMethod").value;
    let permanentKeyValue = document.getElementById("permanentKeyValue").value;
    let sequenceNumber = document.getElementById("sequenceNumber").value;
    let opValue = document.getElementById("opValue").value;
    let opcValue = document.getElementById("opcValue").value;

    var subscriber = [];

    for (; min < max; min++) {
        if (min <= 9) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000000000" + min.toString();
        } else if (min <= 99) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "00000000" + min.toString();
        } else if (min <= 999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "0000000" + min.toString();
        } else if (min <= 9999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000000" + min.toString();
        } else if (min <= 99999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000000" + min.toString();
        } else if (min <= 999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "00000" + min.toString();
        } else if (min <= 9999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "0000" + min.toString();
        } else if (min <= 99999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000" + min.toString();
        } else if (min <= 999999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "00" + min.toString();
        } else if (min <= 9999999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "0" + min.toString();
        } else {
            subscriber[min] = "imsi-" + PlmnID.toString() + min.toString();
        }
        console.log(subscriber[min]);
        var Config = SettingConfig(subscriber[min], PlmnID, authenticationMethod, permanentKeyValue, sequenceNumber, opValue, opcValue);
        var url = "http://" + IPaddress.toString() + ":5000/api/subscriber/" + subscriber[min].toString() + "/" + PlmnID.toString(); //Replace your free5gc ip address.

        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Config),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                render(data);
            });
    }
});
//#endregion Subscribe
//#region Delete
mydelete.addEventListener("submit", function (e) {
    e.preventDefault();

    // Type your range
    let min = document.getElementById("Rmin").value;
    let max = document.getElementById("Rmax").value;

    let IPaddress = document.getElementById("URL").value;
    let PlmnID = document.getElementById("PlmnID").value;

    var subscriber = [];

    for (; min < max; min++) {
        if (min <= 9) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000000000" + min.toString();
        } else if (min <= 99) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "00000000" + min.toString();
        } else if (min <= 999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "0000000" + min.toString();
        } else if (min <= 9999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000000" + min.toString();
        } else if (min <= 99999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000000" + min.toString();
        } else if (min <= 999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "00000" + min.toString();
        } else if (min <= 9999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "0000" + min.toString();
        } else if (min <= 99999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "000" + min.toString();
        } else if (min <= 999999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "00" + min.toString();
        } else if (min <= 9999999999) {
            subscriber[min] = "imsi-" + PlmnID.toString() + "0" + min.toString();
        } else {
            subscriber[min] = "imsi-" + PlmnID.toString() + min.toString();
        }
        console.log(subscriber[min]);
        var url = "http://" + IPaddress.toString() + ":5000/api/subscriber/" + subscriber[min].toString() + "/" + PlmnID.toString(); //Replace your free5gc ip address.

        fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        }).then(console.log("Delete successfully"));
    }
});
//#endregion Delete

//#region SettingConfig
function SettingConfig(ueid, PlmnID, authenticationMethod, permanentKeyValue, sequenceNumber, opValue, opcValue) {
    var ueId = ueid.toString();
    let config = {
        plmnID: PlmnID,
        ueId: ueId,
        AuthenticationSubscription: {
            authenticationMethod: authenticationMethod,
            permanentKey: {
                permanentKeyValue: permanentKeyValue,
                encryptionKey: 0,
                encryptionAlgorithm: 0,
            },
            sequenceNumber: sequenceNumber,
            authenticationManagementField: "8000",
            milenage: {
                op: {
                    opValue: opValue,
                    encryptionKey: 0,
                    encryptionAlgorithm: 0,
                },
            },
            opc: {
                opcValue: opcValue,
                encryptionKey: 0,
                encryptionAlgorithm: 0,
            },
        },
        AccessAndMobilitySubscriptionData: {
            gpsis: ["msisdn-0900000000"],
            subscribedUeAmbr: {
                uplink: "1 Gbps",
                downlink: "2 Gbps",
            },
            nssai: {
                defaultSingleNssais: [
                    {
                        sst: 1,
                        sd: "010203",
                    },
                    {
                        sst: 1,
                        sd: "112233",
                    },
                ],
                singleNssais: [
                    {
                        sst: 1,
                        sd: "010203",
                    },
                    {
                        sst: 1,
                        sd: "112233",
                    },
                ],
            },
        },
        SessionManagementSubscriptionData: [
            {
                singleNssai: {
                    sst: 1,
                    sd: "010203",
                },
                dnnConfigurations: {
                    internet: {
                        pduSessionTypes: {
                            defaultSessionType: "IPV4",
                            allowedSessionTypes: ["IPV4"],
                        },
                        sscModes: {
                            defaultSscMode: "SSC_MODE_1",
                            allowedSscModes: ["SSC_MODE_2", "SSC_MODE_3"],
                        },
                        "5gQosProfile": {
                            "5qi": 9,
                            arp: {
                                priorityLevel: 8,
                                preemptCap: "",
                                preemptVuln: "",
                            },
                            priorityLevel: 8,
                        },
                        sessionAmbr: {
                            uplink: "200 Mbps",
                            downlink: "100 Mbps",
                        },
                    },
                },
            },
            {
                singleNssai: {
                    sst: 1,
                    sd: "112233",
                },
                dnnConfigurations: {
                    internet: {
                        pduSessionTypes: {
                            defaultSessionType: "IPV4",
                            allowedSessionTypes: ["IPV4"],
                        },
                        sscModes: {
                            defaultSscMode: "SSC_MODE_1",
                            allowedSscModes: ["SSC_MODE_2", "SSC_MODE_3"],
                        },
                        "5gQosProfile": {
                            "5qi": 9,
                            arp: {
                                priorityLevel: 8,
                                preemptCap: "",
                                preemptVuln: "",
                            },
                            priorityLevel: 8,
                        },
                        sessionAmbr: {
                            uplink: "200 Mbps",
                            downlink: "100 Mbps",
                        },
                    },
                },
            },
            {
                singleNssai: {
                    sst: 1,
                    sd: "010203",
                },
                dnnConfigurations: {
                    internet: {
                        pduSessionTypes: {
                            defaultSessionType: "IPV4",
                            allowedSessionTypes: ["IPV4"],
                        },
                        sscModes: {
                            defaultSscMode: "SSC_MODE_1",
                            allowedSscModes: ["SSC_MODE_2", "SSC_MODE_3"],
                        },
                        "5gQosProfile": {
                            "5qi": 9,
                            arp: {
                                priorityLevel: 8,
                                preemptCap: "",
                                preemptVuln: "",
                            },
                            priorityLevel: 8,
                        },
                        sessionAmbr: {
                            uplink: "200 Mbps",
                            downlink: "100 Mbps",
                        },
                    },
                },
            },
            {
                singleNssai: {
                    sst: 1,
                    sd: "112233",
                },
                dnnConfigurations: {
                    internet: {
                        pduSessionTypes: {
                            defaultSessionType: "IPV4",
                            allowedSessionTypes: ["IPV4"],
                        },
                        sscModes: {
                            defaultSscMode: "SSC_MODE_1",
                            allowedSscModes: ["SSC_MODE_2", "SSC_MODE_3"],
                        },
                        "5gQosProfile": {
                            "5qi": 9,
                            arp: {
                                priorityLevel: 8,
                                preemptCap: "",
                                preemptVuln: "",
                            },
                            priorityLevel: 8,
                        },
                        sessionAmbr: {
                            uplink: "200 Mbps",
                            downlink: "100 Mbps",
                        },
                    },
                },
            },
        ],
        SmfSelectionSubscriptionData: {
            subscribedSnssaiInfos: {
                "01010203": {
                    dnnInfos: [
                        {
                            dnn: "internet",
                        },
                    ],
                },
                "01112233": {
                    dnnInfos: [
                        {
                            dnn: "internet",
                        },
                    ],
                },
            },
        },
        AmPolicyData: {
            subscCats: ["free5gc"],
        },
        SmPolicyData: {
            smPolicySnssaiData: {
                "01010203": {
                    snssai: {
                        sst: 1,
                        sd: "010203",
                    },
                    smPolicyDnnData: {
                        internet: {
                            dnn: "internet",
                        },
                    },
                },
                "01112233": {
                    snssai: {
                        sst: 1,
                        sd: "112233",
                    },
                    smPolicyDnnData: {
                        internet: {
                            dnn: "internet",
                        },
                    },
                },
            },
        },
        FlowRules: null,
    };

    return config;
}
//#endregion SettingConfig

Done.addEventListener("submit", function (e) {
    e.preventDefault();
    NoneConfigContainer();
});

Config_button.addEventListener("click", function (e) {
    e.preventDefault();
    ShowConfigContainer();
});

function render() {
    console.log("Register successfully");
}

function ShowConfigContainer() {
    ConfigContainer.style = "display: block";
}

function NoneConfigContainer() {
    ConfigContainer.style = "display: none";
}
