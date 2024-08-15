"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODES = exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
    StatusCodes[StatusCodes["ACCEPTED"] = 202] = "ACCEPTED";
    StatusCodes[StatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCodes[StatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    StatusCodes[StatusCodes["CONFLICT"] = 409] = "CONFLICT";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCodes[StatusCodes["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    StatusCodes[StatusCodes["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    StatusCodes[StatusCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    StatusCodes[StatusCodes["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
exports.STATUS_CODES = {
    OK: StatusCodes.OK,
    CREATED: StatusCodes.CREATED,
    ACCEPTED: StatusCodes.ACCEPTED,
    NO_CONTENT: StatusCodes.NO_CONTENT,
    BAD_REQUEST: StatusCodes.BAD_REQUEST,
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
    FORBIDDEN: StatusCodes.FORBIDDEN,
    NOT_FOUND: StatusCodes.NOT_FOUND,
    METHOD_NOT_ALLOWED: StatusCodes.METHOD_NOT_ALLOWED,
    CONFLICT: StatusCodes.CONFLICT,
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED: StatusCodes.NOT_IMPLEMENTED,
    BAD_GATEWAY: StatusCodes.BAD_GATEWAY,
    SERVICE_UNAVAILABLE: StatusCodes.SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT: StatusCodes.GATEWAY_TIMEOUT,
};
