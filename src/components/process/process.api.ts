import {defHttp} from "/@/utils/http/axios";
import {Modal} from 'ant-design-vue';
import { UploadFileParams } from "/#/axios";
import { UploadApiResult } from "/@/api/sys/model/uploadModel";
import { downloadByUrl } from "/@/utils/file/download";

enum Api {
  base = '/process/task/',
  getDiagramByApplyId = "/process/apply/getDiagram",
  listOptHisByApplyId = "/process/apply/opthis",
}

/**
 *  根据申请ID获取流程详情
 * @param applyId
 */
export const getDiagramByApplyId = (applyId) => defHttp.get({url: Api.getDiagramByApplyId+"/"+ applyId});
/**
 * 根据申请ID获取到对应的申请历史记录
 * @param applyId
 */
export const listOptHisByApplyId = (applyId) => defHttp.get({url: Api.listOptHisByApplyId+"/"+ applyId});
