<template>
  <div class="tmpl">
    <el-row>
      <el-col :span='24'>
        <div class="abread bt-line">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span='24'>
        <!-- 搜索区域 -->
        <div class="abread bt-line">
          <el-row>
            <el-col :span='6'>
              <el-button size='large' class="el-icon-check">全选</el-button>
              <el-button size='large' class="el-icon-plus">新增</el-button>
              <el-button size='small' class="el-icon-delete">删除</el-button>
            </el-col>
            <el-col :span='5' :offset='13'>
              <el-input placeholder="请输入搜索内容" icon="search" v-model="searchVL" :on-icon-click="getlist">
                <!-- :on-icon-click="handleIconClick" -->
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
        <el-table ref="multipleTable" :data='list' border tooltip-effect="dark" style="width: 100%">
          <!-- type="selection":这一列是一个checkbox勾选框 -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="categoryname" label="所属类别" width="100">
          </el-table-column>
          <el-table-column prop="stock_quantity" label="库存" width="100">
          </el-table-column>
          <el-table-column prop="market_price" label="市场价" width="100">
          </el-table-column>
          <el-table-column prop="sell_price" label="销售价" width="100">
          </el-table-column>
          <el-table-column label="属性" width="120">
            <!-- scope:代表但是当前:data中的指向的某个对象，可以通过 scope -->
            <template scope="scope">
              <!-- <img :src="src=scope.row.imgurl"  width='40' height="40" > -->
              <!-- <i width='20px' class="el-icon-picture"></i> -->
              <!-- <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlinght') }"></i> -->
              <!-- <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlinght') }"></i>      -->

              <i v-bind="{class:'el-icon-picture ' + ( scope.row.is_slide == 1?'' : 'unlinght' ) }"></i> <!--类名这个地方 需要个空格'el-icon-picture ' 然后在加 + ( scope.row.is_slide == 1?'' : 'unlinght' ) -->
              <i v-bind="{class:'el-icon-upload ' + ( scope.row.is_top == 1?'' : 'unlinght' ) }"></i>
              <i v-bind="{class:'el-icon-star-on'}"></i> 

            </template>
          </el-table-column>

          <!-- template：是属于当前列的模板，可以有程序员自己编写这一列的样式 -->
          <el-table-column label="操作" width="120">
            <template scope='scope'>
              <a href="javascript:;">修改</a>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="block">
          <!-- size-change和current-change事件来处理页码大小和当前页变动时候触发的事 
            page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项
            :current-page用户输入的页码
            :page-size当前的页容量 
            -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="amount">
          </el-pagination>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
  // import axios from 'axios'
  export default {
    data() {
      return {
        pageSize: 10, //定义一个分页组件中页容量，默认是10条
        pageIndex: 1, //定义一个分页的索引 默认在第一页
        searchVL: '', //搜索的条件
        amount: 0,
        list: [] //存放数据来的商品数据
      }
    },
    methods: {

      handleSizeChange(size) { //当前的页容量

        console.log(size);
        this.pageSize = size; //当前的页容量

        this.getlist() //重新获取一次
      },
      handleCurrentChange(currentPage) { ////将当前页的索引给 当前的分页索引器
        console.log(currentPage)
        this.pageIndex = currentPage; //将用户选择的页面 的索引  给分页的索引

        this.getlist(); //重新获取一次
      },
      getlist() {
        console.log(this.searchVL);
        // 定义路径
        var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' +
          this.searchVL;
        // axios.get(url).then(res=>{})   
        this.$ajax.get(url).then(res => { //将axios对象绑定到vue的原型上
          this.list = res.data.message;

          this.amount = res.data.totalcount;
        })
      }
    },
    mounted() { //生命周期
      this.getlist();
    }
  }
</script>
<style scoped>
  .unlinght {
    color: rgba(0, 0, 0, 0.3);
  }

</style>