<template>
  <div class="goods" style="align-items: flex-start;">
                <span style="margin-top:8px;">商品规格：</span>
                <el-input class="goodsspec" v-model="goodsspec" clearable :change="changSpec" placeholder="如颜色"></el-input>
                <div class="goodstages">
                  <el-tag style="margin-right:10px;margin-bottom:10px;" 
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable 
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input style="margin-bottom:10px;width:100px" 
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag"  size="small" @click="showInput">+ New Tag</el-button>
                </div>
                <!-- <el-button type="primary" >添加规格</el-button> -->
            </div>
</template>

<script>
// 导出模块
export default {
  // 模块名字
  name: "addTags",
  // 模块数据
  props:{
    goodsspec:{
      type:String,
      default:''
    },
    dynamicTags:{
      type:Array,
      default:[]
    }
  },
  data() {
    //数据  
    return {
      inputVisible: false,
      inputValue: '',
      goodSpec:this.goodsspec
    };
  },
  // 监听指定值，只有指定值变化，才会触发
  watch: {},
  // 里面的函数只有调用才会执行（实时计算）里面是定义的方法
  methods: {
      changSpec(){
        this.$emit('ievent',goodSpec);
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue && !this.dynamicTags.includes(inputValue)) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  },
  // 创建前状态(里面是操作)
  beforeCreate() {},
  // 创建完毕状态(里面是操作)
  created() {},
  // 挂载前状态(里面是操作)
  beforeMount() {},
  // 挂载结束状态(里面是操作)
  mounted() {},
  // 更新前状态(里面是操作)
  beforeUpdate() {},
  // 更新完成状态(里面是操作)
  updated() {},
  // 销毁前状态(里面是操作)
  beforeDestroy() {},
  // 销毁完成状态(里面是操作)
  destroyed() {}
};
</script>

<style scoped>
 .goods{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    padding: 0 20px;
  }
   .goods span{
    display: inline-block;
    min-width: 80px;
    padding-right: 20px;
  }
.goodsspec{
    width: 120px;
    margin-right: 20px;
    flex: 0 0 120px;
  }
  .goodstages{
    /*margin-right: 20px;*/
  }
  .goodsspec input{
    width: 100px;
  }
</style>
