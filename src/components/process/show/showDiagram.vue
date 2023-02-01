<template>
  <div ref="content"  class="containers" style="width:100%;height:100%;overflow:auto;">
    <div id="showdiagramcanvas" class="canvas" style="width:1600px;height:100%;overflow:auto;" />
    <div class="io-zoom-controls">
      <ul class="io-zoom-reset io-control io-control-list">
        <li>
          <a-icon type="reload" @click="zoom(1.0)" />
        </li>
        <li>
          <a-icon type="zoom-out" @click="zoom(-0.1)" />
        </li>
        <li>
          <a-icon type="zoom-in" @click="zoom(0.1)" />
        </li>
      </ul>

    </div>
  </div>

</template>

<script lang="ts" >

import BpmnViewer from 'bpmn-js/lib/Viewer'
import { getDiagramByApplyId } from '../process.api'
const { createMessage } = useMessage();

import {
  defineComponent,
  ref,
  onMounted,
  nextTick, watch
} from "vue";
import { useMessage } from "/@/hooks/web/useMessage";

const props = {
  applyId: {
    type: String,
    required: true,
    default: ""
  }
}
export default defineComponent({
  name: 'showDiagram',
  props,
  setup(props) {

    const state = ref({
      scale: 1 // 流程图比例
    })

    let bpmnViewer = null;
    let highData = null;
    let processDiagramXml = "";

    onMounted(() => {

      console.log("====mounted====")
      // 获取到属性ref为“canvas”的dom节点
      const canvasDiv =  document.getElementById('showdiagramcanvas');

      bpmnViewer = new BpmnViewer({
        container: canvasDiv,
        height: '500px'
      })
      console.log("==========创建bpmn",bpmnViewer)
      //移除掉logo
      const bjsIoLogo = document.querySelector('.bjs-powered-by')
      while (bjsIoLogo && bjsIoLogo.firstChild) {
        bjsIoLogo.removeChild(bjsIoLogo.firstChild)
      }
      nextTick(() => {
        loadProcessDiagramByApplyId()
      })

    });



    async  function loadProcessDiagramByApplyId() {
      console.log(" loadProcessDiagramByApplyId  ",props.applyId)
      if(props.applyId){
        nextTick(async() => {
          const diagramData = await getDiagramByApplyId(props.applyId);
          console.log("loadProcessDiagramByApplyId",diagramData);
          processDiagramXml = diagramData.processXml;
          highData = diagramData.processHighLine;
          if(processDiagramXml){
            nextTick(() => {
              renderDiagram(processDiagramXml);
            })
          }else{
            console.log("==========未获取到对应的流程图")
            renderDiagram("");
          }
        })
      }

    }

    function setNodeColor(){
      let canvas = bpmnViewer.get("canvas");
      highData.highLine.forEach((e) => {
        if (e) {
          canvas.addMarker(e, "highlightFlow");
        }
      });
      //高亮任务
      highData.highPoint.forEach((e) => {
        if (e) {
          canvas.addMarker(e, "highlight");
        }
      });
      //高亮我执行过的任务
      highData.iDo.forEach((e) => {
        if (e) {
          canvas.addMarker(e, "highlightIDO");
        }
      });
      //高亮下一个任务
      highData.waiting.forEach((e) => {
        if (e) {
          canvas.addMarker(e, "highlightTODO");
        }
      });

    }

    // function setNodeColor1() {
    //   var elementRegistry = this.bpmnViewer.get('elementRegistry')
    //
    //   // 执行代码
    //
    //   for (var node in this.nodeMap) {
    //     var shape = elementRegistry.get(this.nodeMap[node].nodeId)
    //     if (!shape) continue
    //     this.modeling.updateProperties(shape, {
    //       name: this.nodeMap[node].nodeName
    //     })
    //     if (this.nodeMap[node].approved) {
    //       this.modeling.setColor(shape, {
    //         fill: 'white',
    //         stroke: 'green'
    //       })
    //     }
    //     if (this.nodeMap[node].current) {
    //       this.modeling.setColor(shape, {
    //         fill: 'white',
    //         stroke: 'red'
    //       })
    //     }
    //   }
    // },

    // 流程图放大缩小
    function zoom(radio) {
      console.log('handleZoom () ' + radio)
      const newScale = radio === 1.0
        ? 1.0 // 不输入radio则还原
        : state.value.scale + radio <= 0.2 // 最小缩小倍数
          ? 0.2
          : state.value.scale + radio

       bpmnViewer.get('canvas').zoom(newScale)
       state.value.scale = newScale
    }
    /**
     * 渲染
     */
    function renderDiagram(xml) {
      if (xml === 'undefined' || xml === null || xml === '') {
        createMessage.warn('请先绘制流程图！')
        //this.$emit('close')
        return
      }

      bpmnViewer.importXML(xml, err => {
        if (err) {
          createMessage.warn('请选择正确的bpmn 或 XML 文件 ！' + err)
        } else {
          console.log('init diagram success!')
          // 让图能自适应屏幕
          // this.bpmnViewer.get('canvas').zoom('fit-viewport')
          bpmnViewer.get('canvas').zoom(1.2)
          nextTick(() => {
            setNodeColor();
          })
        }
      })
    }

    // function checkIsNullOrEmpty(value) {
    //   // 正则表达式用于判斷字符串是否全部由空格或换行符组成
    //   var reg = /^\s*$/
    //   // 返回值为true表示不是空字符串
    //   return (value != null && value !== undefined && !reg.test(value))
    // }

    /**
     * 监听对应的业务ID
     */
    watch(
      () => props.applyId,
      () => {
        console.log("watch applyId : ",props.applyId)
        if (!props.applyId) {
          //设置数据为空
          return;
        }
        loadProcessDiagramByApplyId();

      },
      { immediate: true }
    );

    return {zoom};


  },

});


</script>


<style lang='scss'>

.highlight .djs-visual > :nth-child(1) {
  stroke: green !important;
  fill: rgba(0, 80, 0, 0.4) !important;
}
.highlightFlow .djs-visual > :nth-child(1) {
  stroke: green !important;
}
.highlightIDO .djs-visual > :nth-child(1) {
  stroke: rgb(255, 196, 0) !important;
  fill: rgba(255, 196, 0, 0.4) !important;
}
.highlightTODO .djs-visual > :nth-child(1) {
  stroke: rgb(255, 0, 0) !important;
  fill: rgba(255, 255, 255, 0.4) !important;
}



body,
html {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  height: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
}

a:link {
  text-decoration: none;
}

.content11 {
  position: relative;
  width: 100%;
  height: 100%;
}

.io-zoom-controls {
    width: auto;
    position: absolute;
    bottom: 50px;
}

.io-zoom-reset {
    margin-bottom: 10px;
}
.io-control-list {
    list-style: none;
    padding: 5px;
    margin: 0;
}
.io-control-list {
    list-style: none;
    padding: 5px;
    margin: 0;
}
.bjs-powered-by, .cjs-powered-by, .djs-powered-by, .io-control {
    background: #FFF;
    border-radius: 2px;
    border: solid 1px #E0E0E0;
    padding: 5px;
}
ul {
    padding-left: 30px;
}
* {
    box-sizing: border-box;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

ul li button {
    cursor:pointer;
}

</style>
