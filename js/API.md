**AUDIO-POINTS version 1.0**
----
  获取用户录制音频的评分等信息

* **Method:**

  recorderInit
  
    * **Data Params**
    
      None
    
    * **Success Response:**
    
      * **Code:** 200 <br />
        **Content:** `{ msg : "connect success" }`
     
    * **Error Response:**
    
      * **Code:** 404 <br />
        **Content:** `{ msg : "NOT CONNECTED" }`
    
    * **Sample Call:**
      * [CORDOVA explain](http://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html)
      ```javascript
        cordova.exec(function(winParam) {},//调用成功回调
                 function(error) {},//调用失败回调
                 "AUDIO-POINTS",//The service name to call on the native side
                 "recorderInit",//The action name to call on the native side
                 []);// An array of arguments to pass into the native environment.
      ```
* **Method:**

  recorderStart
  
    * **Data Params**
    ```javascript
    {
       startCallback=()=>{},//[optional]录音开始回调函数，可能是多余的，因为Cordova在调用中已经提供了成功的回调
       endCallback=(data)=>{},//[required]录音结束回调函数
       getPointsCallback=(data)=>{},//[optional]获取评分成功后的回调函数
       errorCallback,//[required]录音过程中如出现错误，通过该回调通知前端
       pauseRecoverCallback,//[optional]前端调用该方法暂停或恢复录音，目前项目无此需求
       cancelCallback=()=>{},//[optional]前端调用该方法自动取消录音和评分
       hasPoints=[true|false],//[optional]Boolean, 是否请求评分, default:false
       recorderTime=3000//[required], {number}, millseconds, default:3000
    }
    ```
    endCallback(data),录音结束回调，返回值：{Object}
    ```javascript
    {
       url,//录制音频链接
       duration//时长
    }
    ```
    getPointsCallback(data),评分返回的数据接口,返回值：{Object}：
    ```javascript
    {
       points,//得分
       smooth,//流畅度
       completed,//完成度
       correctness,//准确度
       comments//评语
    }
    ```
    * **Success Response:**
    
      * **Code:** 200 <br />
        **Content:** `{ msg : "record start" }`
     
    * **Error Response:**
    
      * **Code:** 404 <br />
        **Content:** `{ msg : "not start" }`
    
    * **Sample Call:**
      ```javascript
        cordova.exec(function(winParam) {},
                 function(error) {},
                 "AUDIO-POINTS",
                 "recorderStart",
                 [{
                   startCallback,
                   endCallback,
                   getPointsCallback,
                   cancelCallback,
                   errorCallback,
                   pauseRecoverCallback,
                   hasPoints,
                   recorderTime
                 }]);
      ```
      
保存数据：[Official Proposal](http://cordova.apache.org/docs/en/latest/cordova/storage/storage.html)
  
* **Plan1**

  [cordova-plugin-secure-key-store](https://www.npmjs.com/package/cordova-plugin-secure-key-store)
  
    * **Sample Call:**
      
      ```javascript
        cordova.plugins.SecureKeyStore.set(function (res) {
          console.log(res); // res - string securely stored 
        }, function (error) {
          console.log(error);
        }, "key", 'string to encrypt');
      ```
* **Plan2**

  [cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage#readme)
  
    * **Sample Call:**
      
      ```javascript
        var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
        db.transaction(function(tr) {
          tr.executeSql("SELECT upper('Test string') AS upperString", [], function(tr, rs) {
          console.log('Got upperString result: ' + rs.rows.item(0).upperString);
          });
        });
      ```