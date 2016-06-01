import {
    Dimensions
} from 'react-native';
import Storage from 'react-native-storage';
let storage = new Storage({
    //最大容量，默认值1000条数据循环存储
    size: 1000,

    //数据过期时间，默认一整天（1000 * 3600 * 24秒）
    defaultExpires: 1000 * 3600 * 24,

    //读写时在内存中缓存数据。默认启用。
    enableCache: true,

    //如果storage中没有相应数据，或数据已过期，
    //则会调用相应的sync同步方法，无缝返回最新数据。
    sync : {
        //同步方法的具体说明会在后文提到
    }
});
storage.sync = {
    //同步方法的名字必须和所存数据的key完全相同
    //方法接受的参数为一整个object，所有参数从object中解构取出
    //这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    breedingSourceReport(params){
        let { id, resolve, reject } = params;
        id = id === '已處理' ? id + ',非孳生源': id;
        fetch(`http://140.116.247.113:11401/breeding_source/get/?database=tainan&status=${id}`)
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            if(responseData){
                resolve && resolve(responseData);
                storage.save({
                    key: 'breedingSourceReport',
                    id:id,
                    rawData: responseData,
                    expires:  1000 * 3600 * 24
                });
                // 成功则调用resolve
            }
            else{
                // 失败则调用reject
                reject && reject('data parse error');
            }
        })
        .catch(err => {
            console.warn(err);
            reject && reject(err);
        });
    },
    hospitalInfo(params) {
        let { id, resolve, reject } = params;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetch(`http://140.116.247.113:11401/hospital/nearby/?database=tainan&lng=${lon}&lat=${lat}`)
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    if(responseData){
                        resolve && resolve(responseData);
                        storage.save({
                            key: 'hospitalInfo',
                            rawData: responseData,
                            expires:  1000 * 3600,
                        });
                    }
                    else{
                        reject && reject(err);

                    }
                })
                .catch((error) => {
                    console.warn(err);
                    reject && reject(err);
                })
                .done();
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
};
export default {
    mainColor : '#ff6633',
    mainLightColor: '#ffb399',
    backgroundColor: '#f2f2f2',
    screenHeight : Dimensions.get('window').height,
    screenWidth : Dimensions.get('window').width,
    statusBarHeight : 60,
    storage: storage,
};
