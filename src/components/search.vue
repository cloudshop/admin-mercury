<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item @click="up">活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name: "searchCP",
    data() {
        return {};
    },
    // 注册组件
    components: {
        // headerComponent
    },
    // 接收父组件的值
    props: ["childMsg"],
    // 监听指定值，只有指定值变化，才会触发
    watch: {},
    // 里面的函数只有调用才会执行（实时计算）里面是定义的方法
    methods: {
        up() {
            this.$emit("upup", "hehe"); //主动触发upup方法，'hehe'为向父组件传递的数据
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
/* scoped 样式只在本组件使用 */
</style>
