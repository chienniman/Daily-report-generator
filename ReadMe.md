## Daily-report-generator
Converting a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) with **23,000+** records (**300,000+** values) of PX Mart inventory data into daily reports within 5 seconds is achievable, although times may vary based on device computational capabilities. What used to take 2 hours of manual work can now yield results within a few seconds.

![preview](https://github.com/chienniman/Daily-report-generator/assets/97031067/04738835-7670-4d1b-a090-16875b5d67ec)

## Algorithm
Here's a brief explanation of how to convert CSV records into a table
### Input
```
[A 店,商品 1,10] 
[A 店,商品 2,10] 
[A 店,商品 3,10] 
[B 店,商品 1,20] 
[B 店,商品 2,20] 
[B 店,商品 3,20] 
[C 店,商品 1,30] 
[C 店,商品 2,30]
[C 店,商品 3,30]
```
### Output
|  | 商品 1 | 商品 2 | 商品 3 |
| -------- | -------- | -------- | -------- |
| A  店    | 10     | 10     | 10     |
| B  店    | 20     | 20     | 20     |
| C  店    | 30     | 30     | 30     |

## Usage
[Daily-report-generator](https://www.boris.idv.tw/Daily-report-generator/)

1.Download the [mock data](https://drive.google.com/file/d/1ySFTcuM3ZS92sDCSwDlfeXwH0Dyh9nXS/view?usp=sharing) by [data_masker](https://github.com/chienniman/Daily-report-generator/tree/feat/data-obfuscation) where each field value will display as NaN.

2.Click UPLOAD.

3.Click the Generate.
