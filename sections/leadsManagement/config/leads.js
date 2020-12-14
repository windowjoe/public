/*in DPClasses.js,
line 48

look to see if args are being passed in when objects are instantiated. I don't think the user options are being combined/aren't overriding default options
*/


var leadsPage = new DataPage('leads', 'leads', '../../../intranet/php/ajax/sections/leads-management/leads.php');

leadsPage.dpForms.setDPOrder('update', 'DESC');

leadsPage.setup(
{
    objects: {
        instances: {
            sH: {
                args: [{
                        shSectionsBtns: {
                            containers: {
                                add:
                                {
                                    title: 'Show Add Form',
                                    icon: 'plus'
                                },
                                fetch:
                                {
                                    title: 'Show Update Forms',
                                    containerCollapsed: false
                                }
                            },
                            forms: {
                                add: [
                                    {
                                        title: 'Add Form : Show Lead Details',
                                        icon: 'id-card-o',
                                        collapseContainer: '.row-user',
                                        containerCollapsed: true
                                    }
                                ],
                                update: [
                                    {
                                        meta: true,
                                        title: 'Update Form : Show Lead Details',
                                        icon: 'id-card-o',
                                        collapseContainer: '.row-user, .row-internal'
                                    }
                                ],
                                search: false
                            }
                        }
                    }
                ]
            }
        }
    },
    containers: [
        {name: 'view', order: "450"}
    ],
    forms: {
        standardForms: {
            update: {
                btns: {
                    names: {crud: ['update', 'delete']}
                }
            }
        },
        common: {
            className: 'hover_form fields_form_draggable'
        },
        layout: {
            formWrapper: {
                className: 'leads_form_wrapper'
            },
            standardForms: {
                rows: {
                    main: {
                        btns: true,
                        cols: {
                            1: {fieldNames: ['date_time'], className: 'col_160_px'},
                            2: {fieldNames: ['site'], className: 'col_10_percent', fieldSettings: {addOnLeft: 'addOn80'}},
                            3: {fieldNames: ['FN'], colspan:2, className: 'col_9_percent', fieldSettings: {addOnLeft: 'addOn80'}},
                            4: {fieldNames: ['LN'], colspan:2, className: 'col_9_percent', fieldSettings: {addOnLeft: 'addOn80'}},
                            5: {fieldNames: ['buying_vendor'], className: 'col_12_percent', fieldSettings: {addOnLeft: 'addOn40'}},
                            6: {fieldNames: ['purchase_price'], fieldSettings: {addOnLeft: 'addOn40'}},
                            7: {fieldNames: ['returned'], className: 'col_10_percent', fieldSettings: {addOnLeft: 'addOn40'}}
                        }
                    },
                    user:{
                        tabs: {
                            user: {
                                tabHeader: 'User',
                                active: true,
                                cols: {
                                    user_01: {fieldNames: ['S1', 'CT', 'SP', 'PC', 'uzs_referer'], colspan: 4, fieldSettings: {addOnLeft: {className:'addOn130'}}},
                                    user_02: {fieldNames: ['HP', 'phone_type', 'EM', 'user_ip', 'comments'], colspan: 4, fieldSettings: {addOnLeft: {className:'addOn130'}}},
                                    user_03: {fieldNames: ['scope', 'num_windows', 'buy_timeframe', 'own_home'], colspan: 4, fieldSettings: {addOnLeft: {className:'addOn130'}}},
                                }
                            },
                            system: {
                                tabHeader: 'Systems',
                                cols: {
                                    1: {fieldNames: ['tf_cert_ip', 'tf_city', 'tf_state', 'tf_zip'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    2: {fieldNames: ['tf_latitude', 'tf_longitude', 'tf_time_zone'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    3: {fieldNames: ['tf_cert_browser', 'tf_cert_operating_system','tf_cert_user_agent'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    4: {fieldNames: ['tf_cert_event_duration', 'tf_cert_parent_location','tf_cert_location'], colspan: 4, fieldSettings: {addOnLeft: {className:'addOn130'}}}
                                }
                            }
                        }
                    },
                    internal: {
                        tabs: {
                            ping_post: {
                                tabHeader: 'Ping Post',
                                active: true,
                                cols: {
                                    1: {fieldNames: ['qs_ping_status', 'qs_ping_message', 'qs_ping_price', 'qs_post_result_status', 'qs_post_result_message', 'qs_ping_curl_total_time', 'qs_post_curl_total_time', 'qs_resubmit'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    2: {fieldNames: ['hil_ping_status', 'hil_ping_message', 'hil_ping_price', 'hil_post_result_status', 'hil_post_result_message', 'hil_ping_curl_total_time', 'hil_post_curl_total_time', 'hil_resubmit'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    3: {fieldNames: ['revi_ping_status', 'revi_ping_message', 'revi_ping_price', 'revi_post_result_status', 'revi_post_result_message', 'revi_ping_curl_total_time', 'revi_post_curl_total_time', 'revi_resubmit'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                }
                            },
                            aftermarket: {
                                tabHeader: 'Aftermarket',
                                cols: {
                                    1: {fieldNames: ['nxP_post_result_status', 'nxP_post_result_message', 'nxP_post_curl_total_time'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    2: {fieldNames: ['ebv_wrc_link', 'ebv_subs', 'ebv_matches', 'ebv_appt_confirmed', 'ebv'], colspan: 4, fieldSettings: {addOnLeft: {className:'addOn110'}}}
                                }
                            },
                            trusted_form: {
                                tabHeader: 'Trusted Form',
                                cols: {
                                    1: {fieldNames: ['tf_id', 'tf_page_id','tf_cert_token', 'jornaya_lead_id'], colspan: 3, fieldSettings: {addOnLeft: {className:'addOn130'}}},
                                    2: {fieldNames: ['tf_cert_created_at', 'tf_cert_expires_at', 'tf_age', 'tf_created_at','tf_expires_at'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}},
                                    3: {fieldNames: ['tf_cert_url','tf_masked_cert_url','tf_share_url','tf_cert_snapshot_url'], colspan: 7, fieldSettings: {addOnLeft: {className:'addOn130'}}},
                                }
                            },
                            internal: {
                                tabHeader: 'Internal',
                                cols: {
                                    internal_01: {fieldNames: ['reviewed'], colspan: 4, fieldSettings: {addOnLeft: {className:'addOn70'}}},
                                    internal_02: {fieldNames: ['record_id', 'cc_lead_id', 'buying_vendor_lead_id'], colspan: 2, fieldSettings: {addOnLeft: {className:'addOn45Percent'}}}
                                }
                            },
                        }
                    }
                }
            }
        }
    },
    fieldsArr: {
        standardForms: [
            {date_time: {addOnLeft: false}},
            {site: {
                element: {
                    tagName: 'select',
                    optionVals: ['wr', 'rw', 'sw']
                },
                addOnLeft: false
            }},
            {FN: {addOnLeft: false}},
            {LN: {addOnLeft: false}},
            {buying_vendor: {
                element: {
                    tagName: 'select',
                    placeholder: 'Buyer', optionVals: ['qs', 'ac', 'hil', 'revi', 'gwm', 'not sold']},
                    addOnLeft: false
                }
            },
            {purchase_price: {addOnLeft: false}},
            {returned: {
                element: {
                    tagName: 'select',
                    optionVals: [{htmlStr: 'valid', value: '0'}, {htmlStr: 'client return', value: '1'}, {htmlStr: 'bad data', value: '2'}, {htmlStr: 'out of scope', value: '3'}, {htmlStr: 'double-sale', value: '5'}, {htmlStr: 're-sale', value: '6'}, {htmlStr: 'other', value: '50'}],
                    addOnLeft: false
                }
            }},
            {S1: {placeholder: 'Street'}},
            {CT: {placeholder: 'City'}},
            {SP: {
                element: {
                    placeholder: 'State',
                    tagName: 'select', optionVals: [{value: 'AL', htmlStr: 'Alabama'}, {value: 'AK', htmlStr: 'Alaska'}, {value: 'AZ', htmlStr: 'Arizona'}, {value: 'AR', htmlStr: 'Arkansas'}, {value: 'CA', htmlStr: 'California'}, {value: 'CO', htmlStr: 'Colorado'}, {value: 'CT', htmlStr: 'Connecticut'}, {value: 'DE', htmlStr: 'Delaware'}, {value: 'FL', htmlStr: 'Florida'}, {value: 'GA', htmlStr: 'Georgia'}, {value: 'HI', htmlStr: 'Hawaii'}, {value: 'ID', htmlStr: 'Idaho'}, {value: 'IL', htmlStr: 'Illinois'}, {value: 'IN', htmlStr: 'Indiana'}, {value: 'IA', htmlStr: 'Iowa'}, {value: 'KS', htmlStr: 'Kansas'}, {value: 'KY', htmlStr: 'Kentucky'}, {value: 'LA', htmlStr: 'Louisiana'}, {value: 'ME', htmlStr: 'Maine'}, {value: 'MD', htmlStr: 'Maryland'}, {value: 'MA', htmlStr: 'Massachusetts'}, {value: 'MI', htmlStr: 'Michigan'}, {value: 'MN', htmlStr: 'Minnesota'}, {value: 'MS', htmlStr: 'Mississippi'}, {value: 'MO', htmlStr: 'Missouri'}, {value: 'MT', htmlStr: 'Montana'}, {value: 'NE', htmlStr: 'Nebraska'}, {value: 'NV', htmlStr: 'Nevada'}, {value: 'NH', htmlStr: 'New Hampshire'}, {value: 'NJ', htmlStr: 'New Jersey'}, {value: 'NM', htmlStr: 'New Mexico'}, {value: 'NY', htmlStr: 'New York'}, {value: 'NC', htmlStr: 'North Carolina'}, {value: 'ND', htmlStr: 'North Dakota'}, {value: 'OH', htmlStr: 'Ohio'}, {value: 'OK', htmlStr: 'Oklahoma'}, {value: 'OR', htmlStr: 'Oregon'}, {value: 'PA', htmlStr: 'Pennsylvania'}, {value: 'RI', htmlStr: 'Rhode Island'}, {value: 'SC', htmlStr: 'South Carolina'}, {value: 'SD', htmlStr: 'South Dakota'}, {value: 'TN', htmlStr: 'Tennessee'}, {value: 'TX', htmlStr: 'Texas'}, {value: 'UT', htmlStr: 'Utah'}, {value: 'VT', htmlStr: 'Vermont'}, {value: 'VA', htmlStr: 'Virginia'}, {value: 'WA', htmlStr: 'Washington'}, {value: 'DC', htmlStr: 'Washington DC'}, {value: 'WV', htmlStr: 'West Virginia'}, {value: 'WI', htmlStr: 'Wisconsin'}, {value: 'WY', htmlStr: 'Wyoming'}]
                }
            }},
            {PC: {placeholder: 'Zip Code'}},
            {HP: {element: {placeholder: 'Phone', addClassName: 'mask phone-mask'}}},
            {phone_type: {
                element: {
                    tagName: 'select',
                    optionVals: ['mobile', 'landline']
                }
            }},
            {EM: {placeholder: 'Email'}},
            'user_ip',
            {scope: {
                element: {
                    tagName: 'select',
                    optionVals: ['Repair', 'Install']
                }
            }},
            {num_windows: {
                element: {
                    tagName: 'select',
                    optionVals: ['1', '2', '3-5', '6-9', '10'],
                    placeholder: '# Windows'
                }
            }},
            {buy_timeframe: {
                element: {
                    tagName: 'select',
                    optionVals: ['Immediately', '1-6 months', 'Don\'t Know'],
                    placeholder: 'Timeframe'
                }
            }},
            {own_home: {
                element: {
                    tagName: 'select',
                    optionVals: [{htmlStr: 'Yes', value: 'Yes'}, {htmlStr: 'No', value: 'No'}]
                }
            }},
            {record_id: {placeholder: 'DB Record PK'}},
            {cc_lead_id: {placeholder: 'CC ID'}},
            {buying_vendor_lead_id: {placeholder: 'BVLID'}},
            {comments: {
                element: {
                    tagName: 'textarea',
                    attributes: {style: 'height: 96px'}
                }
            }},
            {reviewed: {
                element: {
                    placeholder: 'INTERNAL USE ONLY: review notes',
                    addOnLeft: {htmlStr: 'Reviewed'},
                    tagName: 'textarea',
                    attributes: {style: 'height: 226px'}
                }
            }},
            {qs_ping_status: {placeholder: 'QS Ping Status'}},
            {qs_ping_message: {placeholder: 'QS Ping Message'}},
            {qs_ping_price: {placeholder: 'QS Ping Price'}},
            {qs_post_result_status: {placeholder: 'QS Post Status'}},
            {qs_post_result_message: {placeholder: 'QS Post Message'}},
            {qs_ping_curl_total_time: {placeholder: 'QS Ping Time'}},
            {qs_post_curl_total_time: {placeholder: 'QS Post Time'}},
            {qs_resubmit: {
                element: {
                    addOnLeft: false,
                    tagName: 'input',
                    type: 'submit',
                    addClassName: 'resubmit'
                }
            }},
            {hil_ping_status: {placeholder: 'HIL Ping Status'}},
            {hil_ping_message: {placeholder: 'HIL Ping Message'}},
            {hil_ping_price: {placeholder: 'HIL Ping Price'}},
            {hil_post_result_status: {placeholder: 'HIL Post Status'}},
            {hil_post_result_message: {placeholder: 'HIL Post Message'}},
            {hil_ping_curl_total_time: {placeholder: 'HIL Ping Time'}},
            {hil_post_curl_total_time: {placeholder: 'HIL Post Time'}},
            {hil_resubmit: {
                element: {
                    addOnLeft: false,
                    tagName: 'input',
                    type: 'submit',
                    addClassName: 'resubmit'
                }
            }},
            {revi_ping_status: {placeholder: 'RVI Ping Status'}},
            {revi_ping_message: {placeholder: 'RVI Ping Message'}},
            {revi_ping_price: {placeholder: 'RVI Ping Price'}},
            {revi_post_result_status: {placeholder: 'RVI Post Status'}},
            {revi_post_result_message: {placeholder: 'RVI Post Message'}},
            {revi_ping_curl_total_time: {placeholder: 'RVI Ping Time'}},
            {revi_post_curl_total_time: {placeholder: 'RVI Post Time'}},
            {revi_resubmit: {
                element: {
                    addOnLeft: false,
                    tagName: 'input',
                    type: 'submit',
                    addClassName: 'resubmit'
                }
            }},
            {nxP_post_result_status: {placeholder: 'nxP Post Result'}},
            {nxP_post_result_message: {placeholder: 'nxP Post Message'}},
            {nxP_ping_curl_total_time: {placeholder: 'nxP Ping Time'}},
            {nxP_post_curl_total_time: {placeholder: 'nxP Post Time'}},
            {ebv_wrc_link: {
                element:{
                    placeholder: 'WRC LINK',
                    dataAttributes: {'do-user-id': 'true'},
                    addOnRight: {
                        icon: 'external-link',
                        htmlStr: '',
                        className: 'add_on_slim do_user_id',
                        title: 'Link to WRC Form'
                    }
                }
            }},
            {ebv_subs: {
                element: {
                    placeholder: 'EBV Vendor Sub',
                    tagName: 'select',
                    optionVals: [{htmlStr: 'None', value: '0'}, {htmlStr: 'WRC', value: 'wrc'}, {htmlStr: 'Win Promos', value: 'wp'}, {htmlStr: 'Andersen', value: 'and'}],
                }
            }},
            {ebv_matches: {
                element: {
                    name: 'ebv_matches[]',
                    placeholder: 'EBV Sub Matches',
                    tagName: 'select',
                    attributes: ['multiple'],
                    optionVals: [{htmlStr: 'No Matches', value: '0'}, 'Amigo Construction', 'Andersen - Renewal', 'American Vision Windows', 'ARC - Wisconsin', 'Bell Brothers', 'BookACrewe', 'Castle Windows', 'Cronkhite Home Solutions', 'Dabella', 'Delerio Construction', 'Dreamstyle Windows and Doors', 'Green Star Exteriors', 'Hansons', 'Home Depot', 'Northwest Exteriors', 'Reliable Roofing', 'Sears', 'Silver Lining Restoration', 'Superhero Contractors', 'Tahoe Paradise Construction', 'Transform Home Improvements', 'WCCS Construction', 'Window Nation', 'Woodbridge Home Exteriors', 'Other']
                }
            }},
            {ebv_appt_confirmed: {
                element: {
                    placeholder: 'EBV Appt Confirmed',
                    tagName: 'select',
                    optionVals: [{htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}]
                }
            }},
            {ebv: {
                element: {
                    placeholder: 'EBV Sub Bought',
                    tagName: 'select',
                    optionVals: [{htmlStr: 'No', value: '0'}, {htmlStr: 'Yes', value: '1'}]
                }
            }},
            {jornaya_lead_id: {element: {editable: false, placeholder: 'Jornaya Lead ID'}}},
            {tf_cert_ip: {element: {editable: false, placeholder: 'User IP'}}},
            {tf_city: {element: {editable: false, placeholder: 'IP City'}}},
            {tf_state: {element: {editable: false, placeholder: 'IP State'}}},
            {tf_zip: {element: {editable: false, placeholder: 'IP Zip'}}},
            {tf_latitude: {element: {editable: false, placeholder: 'IP Latitude'}}},
            {tf_longitude: {element: {editable: false, placeholder: 'IP Longitude'}}},
            {tf_time_zone: {element: {editable: false, placeholder: 'IP Time Zone'}}},
            {tf_cert_browser: {element: {editable: false, placeholder: 'User Browser'}}},
            {tf_cert_operating_system: {element: {editable: false, placeholder: 'User OS'}}},
            {tf_cert_user_agent: {element: {editable: false, placeholder: 'User Agent'}}},
            {tf_cert_event_duration: {element: {editable: false, placeholder: 'Event Duration'}}},
            {tf_cert_parent_location: {element: {editable: false, placeholder: 'Parent Page'}}},
            {tf_cert_location: {element: {editable: false, placeholder: 'Page Cert Created On'}}},
            {tf_id: {element: {editable: false, placeholder: 'ID'}}},
            {tf_page_id: {element: {editable: false, placeholder: 'Page ID'}}},
            {tf_cert_token: {element: {editable: false, placeholder: 'Cert Token'}}},
            {tf_cert_url: {
                element: {
                    editable: false,
                    placeholder: 'Cert URL',
                    addOnRight: {
                        icon: 'external-link',
                        htmlStr: '',
                        className: 'add_on_slim pop_link_field web_link',
                        title: 'Zip Submit URL'
                    }
                }
            }},
            {tf_masked_cert_url: {
                element: {
                    editable: false,
                    placeholder: 'Masked Cert URL',
                    addOnRight: {
                        icon: 'external-link',
                        htmlStr: '',
                        className: 'add_on_slim pop_link_field web_link',
                        title: 'Masked Cert Link'
                    }
                }
            }},
            {tf_share_url: {
                element: {
                    editable: false,
                    placeholder: 'Share URL',
                    addOnRight: {
                        icon: 'external-link',
                        htmlStr: '',
                        className: 'add_on_slim pop_link_field web_link',
                        title: 'Share Cert Link'
                    }
                }
            }},
            {tf_cert_snapshot_url: {
                element: {
                    editable: false,
                    placeholder: 'Cert Snapshot URL',
                    addOnRight: {
                        icon: 'external-link',
                        htmlStr: '',
                        className: 'add_on_slim pop_link_field web_link',
                        title: 'Cert Snapshot Link'
                    }
                }
            }},
            {tf_created_at: {element: {editable: false, placeholder: 'Created At'}}},
            {tf_expires_at: {element: {editable: false, placeholder: 'Expires At'}}},
            {tf_age: {element: {editable: false, placeholder: 'Age At Claim'}}},
            {tf_cert_expires_at: {element: {editable: false, placeholder: 'Cert Expires At'}}},
            {tf_cert_created_at: {element: {editable: false, placeholder: 'Cert Created On'}}},
            {uzs_referer: {
                element: {
                    placeholder: 'Zip Submit URL',
                    addOnRight: {
                        icon: 'external-link',
                        htmlStr: '',
                        className: 'add_on_slim pop_link_field web_link',
                        title: 'Zip Submit URL'
                    }
                }
            }}
        ]
    }
}, {setSelects: true});