<template>
  <div id="Search">
    <header>
      <!-- <van-search placeholder="请输入搜索关键词" v-model="inputsearch" background="#fd879f" @search="query"/>
      <div @click="backIndex" class="cancel">取消</div> -->
      <van-search
        v-model="inputsearch"
        placeholder="请输入搜索关键词，按回车搜索"
        show-action
        @search="query"
        @cancel="backIndex"
      />
    </header>
    <main>
        <service @click="$router.push({name: 'ServiceDetail'})" :worksData="itemData">
        </service>
    </main>
  </div>
</template>

<script>
import { Search } from 'vant'
import Service from '../service/Service.vue'
export default {
  name: 'SearchService',
  data () {
    return {
      inputsearch: '',
      itemData: []
    }
  },
  components: {
    VanSearch: Search,
    Service
  },
  methods: {
    backIndex () {
      this.$emit('closeSearch', false)
    },
    query () {
      this.$store.dispatch('selectWorksAct', {
        title: this.inputsearch,
        condition: 6
      })
        .then((res) => {
          if (res.data.success) {
            this.itemData = res.data.workInfo
          }
        }).catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss">
  @import '../../style/base.scss';
  #Search {
    width:100%;
    height:100%;
    @include font-dpr(14px);
    header{
      width:100%;
      height:px2rem(120px);
      position: static;
      line-height: px2rem(120px);
      color:#33363f;
      background:#fd879f;
      .van-search,.van-cell,.van-field__body{
        height:px2rem(80px);
        line-height: px2rem(80px);
        @include font-dpr(14px);
      }
      .van-icon{
        @include font-dpr(16px);
        line-height: px2rem(80px);
      }
      .cancel{
        padding:0 px2rem(40px);
      }
    }
    .van-search--show-action{
      background: transparent!important;
    }
    main{
      background-color: #f1f1f1;
    }
  }
</style>
