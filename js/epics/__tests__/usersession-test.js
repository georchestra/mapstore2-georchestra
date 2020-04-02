
import { testEpic } from '@mapstore/epics/__tests__/epicTestUtils';
import {saveUserSessionEpic, autoSaveSessionEpic, loadUserSessionEpic, removeUserSessionEpic,
    stopSaveSessionEpic, reloadOriginalConfigEpic, loadUserSessionBeforeMapEpic, loadUserSessionBeforeContextEpic} from '../usersession';
import { saveUserSession, loadUserSession, userSessionStartSaving, userSessionStopSaving, removeUserSession,
    userSessionRemoved, userSessionLoaded,
    USER_SESSION_SAVED, USER_SESSION_LOADING, SAVE_USER_SESSION, USER_SESSION_REMOVED, USER_SESSION_LOADED,
    USER_SESSION_STOP_SAVING, LOAD_USER_SESSION, USER_SESSION_START_SAVING } from "@mapstore/actions/usersession";
import {loadContext, LOADING, LOAD_FINISHED, SET_RESOURCE, SET_CURRENT_CONTEXT} from "@mapstore/actions/context";
import {LOAD_MAP_CONFIG, MAP_CONFIG_LOADED, LOAD_MAP_INFO, loadMapConfig} from "@mapstore/actions/config";
import {CLEAR_MAP_TEMPLATES} from "@mapstore/actions/maptemplates";
import expect from "expect";
import { LOCATION_CHANGE } from "connected-react-router";
import axios from "@mapstore/libs/ajax";
import MockAdapter from "axios-mock-adapter";

describe('usersession epics', () => {
    let mockAxios;
    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });
    afterEach(() => {
        mockAxios.restore();
    });
    it('saveUserSession new session with context only', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            },
            context: {
                resource: {
                    id: 1
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            }
        };
        mockAxios.onPost().reply(200, "1");
        mockAxios.onGet().reply(200, {});
        testEpic(saveUserSessionEpic, 2, saveUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_SAVED);
            expect(actions[1].id).toBe(1);
            expect(actions[1].session.map.zoom).toBe(5);
            expect(mockAxios.history.post[0].data).toContain("<name><![CDATA[1.myuser]]></name>");
        }, initialState, done);
    });
    it('saveUserSession new session with context and map only', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            },
            context: {
                resource: {
                    id: 1
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            },
            mapInitialConfig: {
                mapId: 100
            }
        };
        mockAxios.onPost().reply(200, "1");
        mockAxios.onGet().reply(200, {});
        testEpic(saveUserSessionEpic, 2, saveUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_SAVED);
            expect(actions[1].id).toBe(1);
            expect(actions[1].session.map.zoom).toBe(5);
            expect(mockAxios.history.post[0].data).toContain("<name><![CDATA[1.100.myuser]]></name>");
        }, initialState, done);
    });
    it('saveUserSession new session with default context', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            }
        };
        mockAxios.onPost().reply(200, "1");
        mockAxios.onGet().reply(200, {});
        testEpic(saveUserSessionEpic, 2, saveUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_SAVED);
            expect(actions[1].id).toBe(1);
            expect(actions[1].session.map.zoom).toBe(5);
            expect(mockAxios.history.post[0].data).toContain("<name><![CDATA[default.myuser]]></name>");
        }, initialState, done);
    });
    it('saveUserSession udpate session', (done) => {
        const initialState = {
            usersession: {
                id: 1000
            },
            security: {
                user: {
                    name: "myuser"
                }
            },
            context: {
                resource: {
                    id: 1
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            }
        };
        mockAxios.onPut().reply(200, "1");
        mockAxios.onGet().reply(200, {});
        testEpic(saveUserSessionEpic, 2, saveUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_SAVED);
            expect(actions[1].id).toBe(1000);
            expect(actions[1].session.map.zoom).toBe(5);
            expect(mockAxios.history.put[0].url).toContain("/1000");
            expect(mockAxios.history.put[0].data).toContain("<name><![CDATA[1.myuser]]></name>");
        }, initialState, done);
    });
    it('start and stop user session save', (done) => {
        const store = testEpic(autoSaveSessionEpic(10), (action) => action.type !== "END_OF_SESSION_SAVE", userSessionStartSaving(), (actions) => {
            expect(actions[0].type).toBe(SAVE_USER_SESSION);
            expect(actions[actions.length - 1].type).toBe("EPIC_COMPLETED");
        }, {}, done, true);
        setTimeout(() => {
            store.dispatch(userSessionStopSaving());
        }, 100);
    });
    it('loadUserSession loads an existing session for context', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            },
            context: {
                resource: {
                    id: 1
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            }
        };
        mockAxios.onGet("/rest/geostore/misc/category/name/USERSESSION/resource/name/1.myuser").reply(200, {
            Resource: {
                id: 100
            }
        });
        mockAxios.onGet("/rest/geostore/misc/category/name/USERSESSION/resource/name/1.myuser/data").reply(200, {
            map: {
                zoom: 5
            }
        });
        testEpic(loadUserSessionEpic, 2, loadUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_LOADED);
            expect(actions[1].id).toBe(100);
            expect(actions[1].session.map.zoom).toBe(5);
            expect(mockAxios.history.get[0].url).toContain("/1.myuser");
            expect(mockAxios.history.get[1].url).toContain("/1.myuser/data");
        }, initialState, done);
    });
    it('loadUserSession returns an empty session if not found', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            },
            context: {
                resource: {
                    id: 1
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            }
        };
        mockAxios.onGet().reply(404, {});
        testEpic(loadUserSessionEpic, 2, loadUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_LOADED);
            expect(actions[1].id).toNotExist();
            expect(actions[1].session).toNotExist();
            expect(mockAxios.history.get[0].url).toContain("/1.myuser");
            expect(mockAxios.history.get[1].url).toContain("/1.myuser/data");
        }, initialState, done);
    });
    it('removeUserSession removes the session', (done) => {
        const initialState = {
            usersession: {
                id: 1000
            },
            security: {
                user: {
                    name: "myuser"
                }
            },
            context: {
                resource: {
                    id: 1
                }
            },
            map: {
                zoom: 5,
                center: {x: 10, y: 45}
            }
        };
        mockAxios.onGet().reply(200, {});
        mockAxios.onDelete().reply(200, {});
        testEpic(removeUserSessionEpic, 2, removeUserSession(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_LOADING);
            expect(actions[1].type).toBe(USER_SESSION_REMOVED);
        }, initialState, done);
    });
    it('stopSaveSession stops saving when session is removed', (done) => {
        testEpic(stopSaveSessionEpic, 1, userSessionRemoved(), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_STOP_SAVING);
        }, {}, done);
    });
    it('stopSaveSession stops saving when session page changes', (done) => {
        testEpic(stopSaveSessionEpic, 1, ({
            type: LOCATION_CHANGE
        }), (actions) => {
            expect(actions[0].type).toBe(USER_SESSION_STOP_SAVING);
        }, {}, done);
    });
    it('original map config is reloaded when session is removed', (done) => {
        const initialState = {
            usersession: {
                config: {
                    map: {
                        zoom: 10
                    }
                }
            }
        };
        testEpic(reloadOriginalConfigEpic, 1, userSessionRemoved(), (actions) => {
            expect(actions[0].type).toBe(LOAD_MAP_CONFIG);
            expect(actions[0].config.map.zoom).toBe(10);
        }, initialState, done);
    });
    it('user session is loaded before map, if not loaded from context', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            }
        };
        mockAxios.onGet().reply(200, {});
        const store = testEpic(loadUserSessionBeforeMapEpic, 4, loadMapConfig(null, 1), (actions) => {
            expect(actions[0].type).toBe(LOAD_USER_SESSION);
            expect(actions[1].type).toBe(USER_SESSION_START_SAVING);
            expect(actions[2].type).toBe(MAP_CONFIG_LOADED);
            expect(actions[3].type).toBe(LOAD_MAP_INFO);
        }, initialState, done);
        setTimeout(() => {
            store.dispatch(userSessionLoaded());
        }, 10);
    });
    it('user session is not loaded before map, if loaded from context', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            }
        };
        mockAxios.onGet().reply(200, {});
        const store = testEpic(loadUserSessionBeforeMapEpic, 2, loadMapConfig(null, 1, {}, undefined, {} ), (actions) => {
            expect(actions[0].type).toBe(MAP_CONFIG_LOADED);
            expect(actions[1].type).toBe(LOAD_MAP_INFO);
        }, initialState, done);
        setTimeout(() => {
            store.dispatch(userSessionLoaded());
        }, 10);
    });
    it('user session for context only is loaded before context', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            }
        };
        mockAxios.onGet("/rest/geostore/misc/category/name/CONTEXT/resource/name/mycontext").reply(200, {
            Resource: {
                id: 10
            }
        });
        mockAxios.onGet().reply(200, {});
        const store = testEpic(loadUserSessionBeforeContextEpic, 9, loadContext({
            contextName: "mycontext"
        }), (actions) => {
            expect(actions[0].type).toBe(LOADING);
            expect(actions[1].type).toBe(LOAD_USER_SESSION);
            expect(actions[1].name).toBe("10.myuser");
            expect(actions[2].type).toBe(CLEAR_MAP_TEMPLATES);
            expect(actions[3].type).toBe(LOAD_MAP_CONFIG);
            expect(actions[3].configName).toBe("new.json");
            expect(actions[4].type).toBe(USER_SESSION_START_SAVING);
            expect(actions[5].type).toBe(LOADING);
            expect(actions[6].type).toBe(LOAD_FINISHED);
            expect(actions[7].type).toBe(SET_RESOURCE);
            expect(actions[8].type).toBe(SET_CURRENT_CONTEXT);
            expect(mockAxios.history.get[0].url).toContain("/mycontext");
        }, initialState, done);
        setTimeout(() => {
            store.dispatch(userSessionLoaded());
        }, 10);
    });
    it('user session for context and mapId is loaded before context', (done) => {
        const initialState = {
            usersession: {},
            security: {
                user: {
                    name: "myuser"
                }
            }
        };
        mockAxios.onGet("/rest/geostore/misc/category/name/CONTEXT/resource/name/mycontext").reply(200, {
            Resource: {
                id: 10
            }
        });
        mockAxios.onGet().reply(200, {});
        const store = testEpic(loadUserSessionBeforeContextEpic, 9, loadContext({
            contextName: "mycontext",
            mapId: 5
        }), (actions) => {
            expect(actions[0].type).toBe(LOADING);
            expect(actions[1].type).toBe(LOAD_USER_SESSION);
            expect(actions[1].name).toBe("10.5.myuser");
            expect(actions[2].type).toBe(CLEAR_MAP_TEMPLATES);
            expect(actions[3].type).toBe(LOAD_MAP_CONFIG);
            expect(actions[3].configName).toContain("/5");
            expect(actions[4].type).toBe(USER_SESSION_START_SAVING);
            expect(actions[5].type).toBe(LOADING);
            expect(actions[6].type).toBe(LOAD_FINISHED);
            expect(actions[7].type).toBe(SET_RESOURCE);
            expect(actions[8].type).toBe(SET_CURRENT_CONTEXT);
            expect(mockAxios.history.get[0].url).toContain("/mycontext");
        }, initialState, done);
        setTimeout(() => {
            store.dispatch(userSessionLoaded());
        }, 10);
    });
});
