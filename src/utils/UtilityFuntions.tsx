import DocumentPicker from 'react-native-document-picker';


type messageObject = {
    ts: Number,
    message: String,
    user: String
}

export const activeMessageArray = (selfUserArray: Array<messageObject>, otherUserArray: Array<messageObject>) => {
    let i = 0
    let j = 0

    let finalArray = []
    let index = 0

    let msgObject: messageObject

    for (; i<selfUserArray.length && j <otherUserArray.length; index++) {
        if (selfUserArray[i].ts >= otherUserArray[j].ts) {
            console.log('0')
            msgObject = selfUserArray[i]
            msgObject.user = 'self'
            finalArray.push(msgObject)
            i++;
        }
        if (selfUserArray[i].ts < otherUserArray[j].ts) {
            console.log('1')
            msgObject = otherUserArray[j]
            msgObject.user = 'other'
            finalArray.push(msgObject)
            j++;
        }
    }
    while (i < selfUserArray.length) {
        console.log('2')
        msgObject = selfUserArray[i++]
        msgObject.user = 'self'
        finalArray.push(msgObject)
    }
    while (j < otherUserArray.length) {
        console.log('3')
        msgObject = otherUserArray[j++]
        msgObject.user = 'other'
        finalArray.push(msgObject)
    }

    return finalArray;
}


export const documentPicker = async(documentName : String)=>{
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: false
            });
            return {...res[0] , documentName  : documentName}
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('USER CANCELLED PICKING DOCUMENT');
            } else {
                console.log('UNKNOWN ERROR IN DOCUMENT PICKER  ::', err);
            }
        }
}