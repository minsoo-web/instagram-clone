# instagram-clone project

## 배운 것

- bottom-tabs
- react-redux / redux-toolkit 실습
- navigate structure
- camera / image picker
  - expo install expo-camera
  - expo install expo-image-picker
- safeareaview for android
  - expo install react-native-safe-area-context
  - import { SafeAreaView } from "react-native-safe-area-context";
  - edge props
    Array of top, right, bottom, and left. Defaults to all.
    아래에만 주고 싶으면 `['bottom']` 이렇게 주면 된다.
- Camera
  - Take a Picture
  - picking a picture
  - save picture to storage -> to firestore
- `A non-serializable value was detected in an action` 이슈
  - https://github.com/rt2zz/redux-persist/issues/988#issuecomment-529407939
  - middleware 에 옵션을 달아주면 해결된다.
