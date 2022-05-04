# GraphQL Practice by React and Django

- front end: React
  - React18 : 一通り (useLazyQueryが機能しないため保留)
  - React17 : 途中まで (create-react-app で React18 ⇒ 手動で17に下げたため依存パッケージのバージョンに問題ないかが懸念)
- server side: Django

## Memo

5/1 時点
- Apollo Client (v3.6) が React 18 に対応しきれていない？
  - useLazyQuery が正常に動作しない (twitterでも見かけた)

- 以下のエラーは出るが動きはする
```
Failed to parse source map from '～\node_modules\ts-invariant\src\invariant.ts' file: Error: ENOENT: no such file or directory, open '～\node_modules\ts-invariant\src\invariant.ts'
```
バグらしい： https://github.com/apollographql/invariant-packages/issues/279

- MUI (v5) が React18 に対応しきれていないが使っている

## Todo

- StateContext.tsx 改善
