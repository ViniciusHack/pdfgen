"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDetailsController = void 0;
const CardDetailsService_1 = require("../services/CardDetailsService.cjs");
class CardDetailsController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new CardDetailsService_1.CardDetailsService();
            const result = yield service.execute(request);
            return response.json(result);
        });
    }
}
exports.CardDetailsController = CardDetailsController;
