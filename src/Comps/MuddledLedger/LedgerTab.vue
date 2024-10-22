<script setup>
import {ref} from "vue";
  const emit = defineEmits(['consumption', 'note', 'classify', 'report', 'setting'])
  // const active_consumption_svg_path = require("@/assets/ledger_consumption.svg")
  // const active_record_svg_path = require("@/assets/ledger_record.svg")
  // const active_category_svg_path = require("@/assets/ledger_category.svg")
  // const active_report_svg_path = require("@/assets/ledger_report.svg")
  // const active_setting_svg_path = require("@/assets/ledger_setting.svg")
  //
  // const default_consumption_svg_path = require("@/assets/ledger_consumption_default.svg")
  // const default_record_svg_path = require("@/assets/ledger_record_default.svg")
  // const default_category_svg_path = require("@/assets/ledger_category_default.svg")
  // const default_report_svg_path = require("@/assets/ledger_report_default.svg")
  // const default_setting_svg_path = require("@/assets/ledger_setting_default.svg")

  // const consumption_svg_path = ref("../../assets/ledger_consumption.svg")
  // const record_svg_path = ref("../../assets/ledger_record.svg")
  // const category_svg_path = ref("../../assets/ledger_category.svg")
  // const report_svg_path = ref("../../assets/ledger_report.svg")
  // const setting_svg_path = ref("../../assets/ledger_setting.svg")

const consumption_color = ref("#409EFF")
const consumption_style = ref("color: #409EFF")
const record_color = ref("#409EFF")
const record_style = ref("color: #409EFF")
const category_style = ref("color: #409EFF")
const report_style = ref("color: #409EFF")
const setting_style = ref("color: #409EFF")
const category_color = ref("#409EFF")
const report_color = ref("#409EFF")
const setting_color = ref("#409EFF")

// let consumption_svg_path = active_consumption_svg_path
// let record_svg_path = active_record_svg_path
// let category_svg_path = active_category_svg_path
// let report_svg_path = active_report_svg_path
// let setting_svg_path = active_setting_svg_path
function set_default() {
    // consumption_svg_path.value = default_consumption_svg_path
    // record_svg_path.value = default_record_svg_path
    // category_svg_path.value = default_category_svg_path
    // report_svg_path.value = default_report_svg_path
    // setting_svg_path.value = default_setting_svg_path
  consumption_color.value = "#2c2c2c"
  report_color.value = "#2c2c2c"
  category_color.value = "#2c2c2c"
  record_color.value = "#2c2c2c"
  setting_color.value = "#2c2c2c"
  consumption_style.value = "color: #2c2c2c"
  record_style.value = "color: #2c2c2c"
  category_style.value = "color: #2c2c2c"
  report_style.value = "color: #2c2c2c"
  setting_style.value = "color: #2c2c2c"
  // consumption_svg_path = default_consumption_svg_path
  // record_svg_path = default_record_svg_path
  // category_svg_path = default_category_svg_path
  // report_svg_path = default_report_svg_path
  // setting_svg_path = default_setting_svg_path
}

  function goto_consumption() {
    emit('consumption')
    set_default()
    consumption_color.value = "#409EFF"
    consumption_style.value = "color: #409EFF"
    // consumption_svg_path = active_consumption_svg_path
    // consumption_svg_path = active_consumption_svg_path
  }
  function goto_note() {
    emit('note')
    set_default()
    record_color.value = "#409EFF"
    record_style.value = "color: #409EFF"
    // record_svg_path = active_record_svg_path
    // record_svg_path = active_record_svg_path
  }
  function goto_classify() {
    emit('classify')
    set_default()
    category_color.value = "#409EFF"
    category_style.value = "color: #409EFF"
    // category_svg_path = active_category_svg_path
    // category_svg_path = active_category_svg_path
  }
  function goto_report() {
    emit('report')
    set_default()
    report_color.value = "#409EFF"
    report_style.value = "color: #409EFF"
    // report_svg_path = active_report_svg_path
    // report_svg_path = active_report_svg_path
  }
  function goto_setting() {
    emit('setting')
    set_default()
    setting_color.value = "#409EFF"
    setting_style.value = "color: #409EFF"
    // setting_svg_path = active_setting_svg_path
    // setting_svg_path = active_setting_svg_path
  }

goto_consumption()
</script>

<template>
  <div style="display: flex; margin: 12px; justify-content: center">
    <div @click="goto_consumption">
      <el-tooltip
          effect="dark"
          content="消费一览"
          placement="right-end"
          :show-after="500"
      >
        <el-icon :color="consumption_color" :size="70" style="cursor: pointer;margin: 8px;" >
          <template #default>
            <svg t="1729503183626" class="icon" viewBox="0 0 1126 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16408" id="mx_n_1729503183626" width="200" height="200"><path d="M51.302246 500.990497H50.227049A509.643271 509.643271 0 0 1 127.948416 241.663275 510.564868 510.564868 0 0 1 460.952217 11.110367l100.556498 499.300902 1.433596 1.535995-1.023997 0.563198 0.0512 0.256h-0.409599L122.674832 773.117681a509.643271 509.643271 0 0 1-71.372586-272.127184zM563.19831 511.998464l511.998464 2.815992v1.331196a509.84807 509.84807 0 0 1-114.124457 318.053445 509.95047 509.95047 0 0 1-177.407468 140.03158A509.95047 509.95047 0 0 1 563.19831 1023.996928c-120.831638 0-231.935304-41.881474-319.487041-111.922864L563.19831 511.998464z m326.194222-394.955615a517.579247 517.579247 0 0 1 72.089384 72.703782l-274.687176 274.687176L614.398157 392.037224l274.994375-274.994375zM748.900153 41.932674l72.396583 72.447783-144.844365 144.793165-72.396583-72.396582L748.900153 41.932674zM963.990708 255.999232l72.447783 72.396583-144.844366 144.844365L819.197542 400.792398 963.990708 255.999232z" p-id="16409" ></path></svg>
          </template>
        </el-icon>
      </el-tooltip>
      <div :style="consumption_style">
        消费一览
      </div>
    </div>

    <div @click="goto_note">
      <el-tooltip
          effect="dark"
          content="消费记录"
          placement="right-end"
          :show-after="500"
      >
        <el-icon :color="record_color" :size="70" style="cursor: pointer;margin: 8px;" >
          <template #default>
            <svg t="1729503549343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17743" width="200" height="200"><path d="M754.881 36.566H150.736c-66.731 0-120.829 54.098-120.829 120.829v724.973c0 66.731 54.098 120.83 120.829 120.83h323.703v-38.039H150.736c-41.768 1.492-85.028-49.459-85.028-82.791V157.395c0-44.751 35.801-85.028 85.028-85.028h604.145c53.702 0 85.774 41.022 85.774 85.028v345.333l35.055-60.415V157.395c0-66.731-54.098-120.829-120.829-120.829z" fill="" p-id="17744"></path><path d="M211.151 236.456v41.768h483.316v-41.768H211.151z m0 162.597h483.316v-41.022H211.151v41.022z m0 120.829h483.316v-42.514H211.151v42.514z m0 120.829h241.658v-40.275H211.151v40.275z" fill="" p-id="17745"></path><path d="M978.849 580.297l-42.724-42.724c-11.816-11.794-27.271-17.691-42.724-17.691s-30.906 5.897-42.725 17.691L591.305 796.922c-11.77 11.816-47.874 57.454-47.874 72.908l-30.207 133.368 133.345-30.207s61.114-36.104 72.932-47.898L978.85 665.744c23.587-23.635 23.587-61.859-0.001-85.447zM698.173 903.672c-3.426 3.241-15.22 11.236-29.695 20.419l-78.268-78.245c8.041-11.001 16.969-22.072 22.469-27.551L807.978 623.02l85.424 85.425-195.229 195.227z"  p-id="17746"></path></svg>
          </template>
        </el-icon>
      </el-tooltip>
      <div :style="record_style">
        消费记录
      </div>
    </div>

    <div @click="goto_classify">
      <el-tooltip
          effect="dark"
          content="消费分类"
          placement="right-end"
          :show-after="500"
      >
        <el-icon :color="category_color" :size="70" style="cursor: pointer;margin: 8px;" >
          <template #default>
            <svg t="1729503613509" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18773" width="200" height="200"><path d="M575.68 736a160.32 160.32 0 1 0 160.32-160.32H599.893333c-13.461333 0-24.192 10.752-24.192 24.192V736zM736 533.333333A202.666667 202.666667 0 1 1 533.333333 736V599.893333A66.432 66.432 0 0 1 599.872 533.333333H736zM490.666667 736a202.666667 202.666667 0 1 1-202.666667-202.666667h136.128A66.432 66.432 0 0 1 490.666667 599.872V736z m-202.666667-160.32a160.32 160.32 0 1 0 160.32 160.32V599.893333c0-13.44-10.730667-24.192-24.192-24.192H288zM533.333333 287.978667A202.666667 202.666667 0 1 1 736 490.666667H599.893333A66.432 66.432 0 0 1 533.333333 424.128V288z m202.666667 160.341333a160.32 160.32 0 1 0-160.32-160.32v136.128c0 13.44 10.730667 24.192 24.192 24.192H736zM448.32 288a160.32 160.32 0 1 0-160.32 160.32h136.128c13.461333 0 24.192-10.752 24.192-24.192V288zM288 490.666667A202.666667 202.666667 0 1 1 490.666667 288v136.128A66.432 66.432 0 0 1 424.128 490.666667H288z"  p-id="18774"></path></svg>
          </template>
        </el-icon>
      </el-tooltip>
      <div :style="category_style">
        消费分类
      </div>
    </div>

    <div @click="goto_report">
      <el-tooltip
          effect="dark"
          content="月消费报表"
          placement="right-end"
          :show-after="500"
      >
        <el-icon :color="report_color" :size="70" style="cursor: pointer;margin: 8px;" >
          <template #default>
            <svg t="1729503635356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19788" width="200" height="200"><path d="M228.254587 913.306922 66.10251 913.306922l0-240.783948 162.152077 0L228.254587 913.306922zM471.464795 913.306922 309.318858 913.306922 309.318858 351.483166l162.145937 0L471.464795 913.306922zM714.681142 913.306922 552.540322 913.306922 552.540322 592.267115 714.681142 592.267115 714.681142 913.306922zM957.896466 913.306922 795.744389 913.306922 795.744389 110.693078l162.152077 0L957.896466 913.306922z"  p-id="19789"></path></svg>
          </template>
        </el-icon>
      </el-tooltip>
      <div :style="report_style">
        月消费报表
      </div>
    </div>

   <div @click="goto_setting">
     <el-tooltip
         effect="dark"
         content="设置"
         placement="right-end"
         :show-after="500"
     >
       <el-icon :color="setting_color" :size="70" style="cursor: pointer;margin: 8px;" >
         <template #default>
           <svg t="1729503664470" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20832" width="200" height="200"><path d="M510.37806 337.803609c-98.010221 0-177.748287 78.842673-177.748287 175.75284 0 96.91426 79.738066 175.763073 177.748287 175.763073 9.537214 0 19.620873-0.978281 31.797194-3.088338 18.196431-3.281743 30.290887-20.538779 26.963095-38.471197-2.924609-15.732309-16.693194-27.152407-32.747845-27.152407-2.071172 0-4.15974 0.196475-6.123464 0.563842-7.937786 1.402953-14.233166 2.056845-19.807115 2.056845-61.159942 0-110.915136-49.201585-110.915136-109.671819 0-60.467163 49.679469-109.661585 110.747313-109.661585 61.116963 0 110.832248 49.194422 110.832248 109.661585 0 5.892197-0.656963 12.0832-2.088568 19.531845-3.327792 17.928325 8.769734 35.189454 26.959002 38.464033 2.006703 0.360204 4.045129 0.546446 6.070252 0.546446 16.204054 0 30.019711-11.43033 32.832779-27.116591 2.13871-11.45182 3.13848-21.435195 3.13848-31.41857 0.042979-46.873564-18.435884-90.990341-52.033074-124.223233C602.407056 356.106464 557.790906 337.803609 510.37806 337.803609z"  p-id="20833"></path><path d="M938.476161 432.79917c-2.185782-11.426237-11.037381-20.499893-22.563902-23.12058-41.909505-9.508561-76.781734-34.929534-98.185206-71.550593-21.334911-36.560684-26.191522-79.099523-13.68979-119.709429 3.52836-11.123338 0.007163-23.235191-8.951883-30.840402-41.860387-35.721573-89.536222-62.938448-141.695163-80.885192-3.152806-1.088798-6.437619-1.639337-9.776667-1.639337-8.256034 0-16.182564 3.431146-21.724791 9.376555-29.236881 31.04404-68.840878 48.140417-111.5107 48.140417-42.673915 0-82.305541-17.125029-111.607914-48.230468-7.877411-8.333806-20.510126-11.512195-31.580253-7.726985-52.483328 18.171871-100.131535 45.416376-141.640927 80.988546-8.815783 7.591909-12.322653 19.620873-8.934486 30.67258 12.586666 40.645722 7.759731 83.180468-13.597693 119.78106-21.306258 36.5965-56.149834 62.006216-98.17395 71.561849-11.540847 2.709715-20.396539 11.812023-22.559808 23.166629-5.228071 27.169803-7.877411 54.346769-7.877411 80.770582 0 26.426883 2.64934 53.603849 7.873318 80.763418 2.174526 11.411911 11.023054 20.488637 22.552645 23.12058 41.913599 9.512654 76.785827 34.922371 98.19237 71.547523 21.349237 36.59343 26.177196 79.128175 13.583366 119.795387-3.363607 10.969842 0.121773 23.013133 8.973372 30.758538 41.84913 35.707246 89.494267 62.920028 141.662417 80.902588 11.466146 3.885494 23.738657 0.549515 31.454386-7.680936 29.29828-31.091112 68.925812-48.216141 111.593588-48.216141s82.302471 17.125029 111.560842 48.183396c5.556553 5.955642 13.494339 9.380648 21.782096 9.380648 3.27765 0 6.537903-0.520863 9.829879-1.599428 52.126194-17.968234 99.774401-45.184085 141.652184-80.912821 8.791224-7.577582 12.308327-19.628036 8.94165-30.758538-12.597923-40.678468-7.745405-83.20605 13.672394-119.773897 21.324678-36.625152 56.192813-62.030775 98.19237-71.547523 11.390421-2.592035 20.23588-11.633968 22.549575-23.106254 5.223978-27.184129 7.870248-54.358025 7.870248-80.770582C946.342316 487.171522 943.697069 459.965903 938.476161 432.79917zM728.572524 789.878798c-26.02677 20.157085-54.736649 36.553521-85.487 48.818869-36.682457-32.144094-83.60207-49.779753-132.792399-49.779753-48.926316 0-95.838765 17.635659-132.767839 49.786916-30.744211-12.262278-59.45716-28.655643-85.491093-48.812729 9.894348-47.441499 1.889023-96.449679-22.763446-138.627291-24.448832-41.966811-63.427588-73.339332-110.186542-88.840374-2.381234-16.343223-3.584642-32.758078-3.584642-48.869011 0-16.043395 1.203408-32.451086 3.584642-48.851615 46.612621-15.389502 85.584214-46.758953 110.186542-88.850607 24.523533-42.024116 32.525788-91.033319 22.74912-138.620128 26.0237-20.149922 54.735625-36.543288 85.494163-48.815799 36.821627 32.201399 83.73817 49.861618 132.778072 49.861618 49.194422 0 96.109941-17.635659 132.792399-49.779753 30.751375 12.269441 59.45716 28.662807 85.48086 48.812729-9.809413 47.63388-1.835811 96.634898 22.667256 138.620128 24.445762 41.966811 63.416332 73.343425 110.182448 88.850607 2.381234 16.386202 3.584642 32.801057 3.584642 48.940642 0.143263 15.443737-1.031493 31.797194-3.499707 48.701189-46.763047 15.504112-85.73771 46.873564-110.186542 88.836281C726.84416 693.189665 718.845998 742.190683 728.572524 789.878798z"  p-id="20834"></path></svg>
         </template>
       </el-icon>
     </el-tooltip>
     <div :style="setting_style">
       设置
     </div>
   </div>


  </div>

</template>

<style scoped>

</style>