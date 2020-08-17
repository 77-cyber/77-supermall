<template>
 <div id="category">
     <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
     <div class="content">
        <tab-menu :categories="categories"
                  @selectItem="selectItem"></tab-menu>

        <scroll id="tab-content" :data="[categoryData]">
          <div>
            <tab-content-category :subcategories="showSubcategory"></tab-content-category>
            <tab-control :titles="['综合', '新品', '销量']"
                        @itemClick="tabClick"></tab-control>
            <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
          </div>
        </scroll>
      </div>
  </div>
</template>

<script type="text/javascript">
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from 'components/content/tabControll/TabControll'
  import Scroll from 'components/common/scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";
export default {
  name:'Category',
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1,
    }
  },
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },
  mixins: [tabControlMixin],
  created () {
    // 1.请求分类数据
      this._getCategory();
  },
  computed: {
    showSubcategory() {
     /*  if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories */
    },
    showCategoryDetail() {
     /*  if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType] */
    }
  },
  methods: {
    _getCategory(){
      getCategory().then(res => {
        console.log(res.data.category.list.length)
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
    },
    _getSubcategories(index){
      this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
    },
    selectItem(){
      
    },
    
    tabClick(){

    },
    

  },
  
}
</script>

<style scoped>
</style>
