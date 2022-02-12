<template>
    <p>谁的</p>
</template>
<script>
import { get } from 'vant/lib/utils'
export default {
    data(){
        return{
         //单个图片唯一标识
          imgss:''
        }
    },
    created(){
        this.imgss=this.$route.params.id;
        this.getcontents()
    },
    methods:{
        async getcontents(){
            let res=await fetch('/yys/designtemplate/getDetailCacheFileUrl.do?_dataType=json&client_type=40&type=2&_dataClientType=3&id='+this.imgss
            ).then(r=>r.json())
            console.log(res);
        }
    }
}
</script>