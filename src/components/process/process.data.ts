import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';

/**
 * 申请记录列表
 */
export const applyListColumn: BasicColumn[] = [
  {
    title: '申请单号',
    align: 'left',
    dataIndex: 'applyCode',
    width: 160,
  },
  {
    title: '标题',
    align: 'left',
    dataIndex: 'title',
    width: 300,
    ellipsis: true
  },
  {
    title: '流程名称',
    align: 'center',
    dataIndex: 'processName',
    width: 160,
    ellipsis: true
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'processStatus',
    width: 150
  },
  {
    title: '申请日期',
    align: 'center',
    width: 160,
    dataIndex: 'createTime'
  },
  {
    title: '申请人',
    align: 'center',
    width: 120,
    dataIndex: 'createUserName'
  },
  {
    title: '所属部门',
    align: 'center',
    dataIndex: 'deptName',
    width: 200,
    ellipsis: true
  }
];



export const taskListColumn: BasicColumn[] = [
  {
    title: '申请单号',
    align: 'left',
    dataIndex: 'applyCode',
    width: 160,
  },
  {
    title: '标题',
    align: 'left',
    dataIndex: 'applyTitle',
    width: 300,
    ellipsis: true
  },
  {
    title: '流程名称',
    align: 'center',
    dataIndex: 'processName',
    width: 160,
    ellipsis: true
  },
  {
    title: '任务节点',
    align: 'center',
    dataIndex: 'name',
    width: 120
  },
  {
    title: '申请日期',
    align: 'center',
    width: 160,
    dataIndex: 'applyTime'
  },
  {
    title: '申请人',
    align: 'center',
    width: 120,
    dataIndex: 'applyUserName'
  },
  {
    title: '所属部门',
    align: 'center',
    dataIndex: 'deptName',
    width: 200,
    ellipsis: true
  }
  ];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'processName',
    component: 'Input',
    label:'流程名称'
  },
  {
    field: 'createTime',
    component: 'RangePicker',
    label:'申请时间'
  },
];


export const operationHisColumns: BasicColumn[] = [
  {
    title: '动作',
    align: 'center',
    dataIndex: 'actionName',
    width : 100
  },
  {
    title: '操作人',
    width : 100,
    align: 'center',
    dataIndex: 'createUserName'
  },
  {
    title: '操作时间',
    width : 200,
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '操作节点',
    width : 200,
    align: 'center',
    dataIndex: 'taskName'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    ellipsis: true
  }
]
