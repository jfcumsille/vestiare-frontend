<template>
<div class="terminal">
  <div class="bar">
    <div class="dots">
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="green"></div>
    </div>
    <div class="title"> Terminal </div>
  </div>
  <div class="code">
    <span class="code-text">
      nicolas$ curl -X GET https://api.fintoc.com/v1/onboarding \
      ... -H 'Authorization: sk_test_UeqADW-sQAoeWV2Bbhw_89NRVuRMRZD5fTVzJKoxt'
      <br>
      Hello from Fintoc 🚀 !

      <br>
      <br>
      nicolas$ curl -X GET https://api.fintoc.com/v1/links \
      ... -H 'Authorization: sk_test_UeqADW-sQAoeWV2Bbhw_89NRVuRMRZD5fTVzJKoxt'
      <br>
      [{"id":"72DQoGNWiRwkdxyp","holder_id":"768827753","username":"167314295",
      "holder_type":"business" "created_at":"2020-11-16T22:57:42.502Z", "institution": {
      "id":"cl_banco_bice","name":"Banco BICE","country":"cl"},"link_token":null,
      "mode":"live","accounts":null}]

      nicolas$ curl -X GET https://api.fintoc.com/v1/links/{link-token} \
      ... -H 'Authorization: sk_test_UeqADW-sQAoeWV2Bbhw_89NRVuRMRZD5fTVzJKoxt'
    </span>
    <span class="code-cursor" style="display: inline">&nbsp;</span>
  </div>
</div>
</template>

<style scoped>

.terminal  {
  font-weight: 450;
  float: left;
  border: solid 1px #000;
  background: #24272e;
  width: calc(60% - 50px);
  overflow: hidden;
  border-radius: 5px;
  box-shadow:  0 0 16px 6px rgba(0,0,0,.05);
}

.bar {
  position: relative;
  background: #191c1f;
  padding: 10px;
  display: flex;
  border-bottom: solid 1px #000;
}

.dots {
  flex-flow: row nowrap;
}

.dots div {
  width: 9px;
  height: 9px;
  display: inline-block;
  margin-right: 5px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}

.red {
  background: #ec655a;
}

.yellow {
  background: #e0c04c;
}

.green {
  background: #71be47;
}

.title {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  color: #fff;
  font-size: 14px;
}

.code {
  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;
  padding: 20px;
  height: 400px;
  width: 600px;
}

.code-text {
  white-space: pre-wrap;
  line-height: 1.5em;
  display: inline;

}

.code-cursor {
  position: relative;
  width: 8px;
  margin-left: -4px;
  background: rgba(204, 85, 85, 0.808);
  line-height: 1.5em;
}
</style>
