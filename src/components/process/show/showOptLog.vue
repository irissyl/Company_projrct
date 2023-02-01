<template>
  <BasicTable @register="registerTable" :rowSelection="false" style="padding: 0px;"></BasicTable>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";
import {BasicTable} from '/@/components/Table';
import { useListPage } from "/@/hooks/system/useListPage";
import { operationHisColumns } from "/@/components/process/process.data";
import { listOptHisByApplyId } from "/@/components/process/process.api";

// 声明Emits
const emit = defineEmits(['select','register']);
//注册table数据
const props = defineProps({
  applyId: { type: String }
});

const operationHisRecords = ref([]);

// 列表页面公共参数、方法
const { prefixCls,tableContext } = useListPage({
  designScope: 'sip-task-detail-table-template',
  tableProps: {
    rowKey: "id",
    dataSource: operationHisRecords,
    immediate : false,
    showIndexColumn: false,
    showActionColumn: false,
    columns: operationHisColumns,
    size: 'small',
    showTableSetting: false,
    useSearchForm: false
  }
})
//注册table数据
const [registerTable,{reload}] = tableContext;


async function loadOptHisByApplyId() {
  console.log(" listOptHisByApplyId  ",props.applyId);
  operationHisRecords.value = [];
  if(props.applyId){
    const optHisData = await listOptHisByApplyId(props.applyId);
    operationHisRecords.value = optHisData;
  }

}

/**
 * 加载数据 赋值
 */
onMounted(() => {
  //加载设置的数据
  loadOptHisByApplyId();
});

/**
 * 监听对应的申请单ID
 */
watch(
  () => props.applyId,
  () => {
    loadOptHisByApplyId();
  },
  { immediate: true }
);

</script>
