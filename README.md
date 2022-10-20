```python
%load_ext autoreload
%autoreload 2
%reload_ext autoreload

from src.models import SensingModel, HumanModel, ScheduleModel
from datetime import datetime as dt

import numpy as np
import pandas as pd
```

    The autoreload extension is already loaded. To reload it, use:
      %reload_ext autoreload

```python
from src.libs import Calender
from src.libs import TNMAnalyzer
```

### Data Set

```python
cal = Calender(9, "직원 1")
cal.datas
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>employee_name</th>
      <th>event</th>
      <th>start_time</th>
      <th>end_time</th>
      <th>score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>직원 1</td>
      <td>지각</td>
      <td>2022-09-05 09:00:00</td>
      <td>2022-09-05 09:10:00</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>직원 1</td>
      <td>지각</td>
      <td>2022-09-06 09:00:00</td>
      <td>2022-09-06 09:05:00</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>직원 1</td>
      <td>자리 이탈</td>
      <td>2022-09-06 13:00:00</td>
      <td>2022-09-06 13:30:00</td>
      <td>6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>직원 1</td>
      <td>자리 이탈</td>
      <td>2022-09-08 17:15:00</td>
      <td>2022-09-08 17:55:00</td>
      <td>8</td>
    </tr>
    <tr>
      <th>4</th>
      <td>직원 1</td>
      <td>자리 이탈</td>
      <td>2022-09-14 14:00:00</td>
      <td>2022-09-14 14:10:00</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>직원 1</td>
      <td>자리 이탈</td>
      <td>2022-09-15 15:00:00</td>
      <td>2022-09-15 16:00:00</td>
      <td>15</td>
    </tr>
    <tr>
      <th>6</th>
      <td>직원 1</td>
      <td>지각</td>
      <td>2022-09-20 09:00:00</td>
      <td>2022-09-20 09:30:00</td>
      <td>6</td>
    </tr>
    <tr>
      <th>7</th>
      <td>직원 1</td>
      <td>자리 이탈</td>
      <td>2022-09-23 16:45:00</td>
      <td>2022-09-23 17:45:00</td>
      <td>15</td>
    </tr>
    <tr>
      <th>8</th>
      <td>직원 1</td>
      <td>자리 이탈</td>
      <td>2022-09-26 13:00:00</td>
      <td>2022-09-26 13:20:00</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>

### 모든 직원에 대하여 TNM Model 도출 및 병합

```python
tnm = TNMAnalyzer(9)

tnm.get_tnm_model()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>employee_name</th>
      <th>Time</th>
      <th>Number</th>
      <th>Magnitude</th>
      <th>TNM Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>직원 1</td>
      <td>26</td>
      <td>8</td>
      <td>60</td>
      <td>94</td>
    </tr>
    <tr>
      <th>1</th>
      <td>직원 2</td>
      <td>30</td>
      <td>1</td>
      <td>2</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>직원 3</td>
      <td>14</td>
      <td>4</td>
      <td>70</td>
      <td>88</td>
    </tr>
  </tbody>
</table>
</div>

### TNM Model 정규화 & 정규화 TNM Model

```python
tnm.get_score_table()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Time</th>
      <th>Number</th>
      <th>Magnitude</th>
      <th>score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1점(우수)</th>
      <td>14.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2점(미달)</th>
      <td>19.3</td>
      <td>3.3</td>
      <td>24.7</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3점(매우미달)</th>
      <td>24.7</td>
      <td>5.7</td>
      <td>47.3</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

### TNM Segmentation

```python
tnm.draw()
```

![png](output_9_0.png)

### 다음달 업무평가 (개선점수 구하기) - 상대평가에 의한 문제

```python
# 10월 데이터 준비
tnm_10 = TNMAnalyzer(10)
tnm_10.draw()
```

![png](output_11_0.png)

### 개선점수를 위한 데이터 병합

```python
tnm_10.get_merge_tnm_model()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Time</th>
      <th>Number</th>
      <th>Magnitude</th>
      <th>TNM Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>직원 1_9월</th>
      <td>26</td>
      <td>8</td>
      <td>60</td>
      <td>94</td>
    </tr>
    <tr>
      <th>직원 2_9월</th>
      <td>30</td>
      <td>1</td>
      <td>2</td>
      <td>33</td>
    </tr>
    <tr>
      <th>직원 3_9월</th>
      <td>14</td>
      <td>4</td>
      <td>70</td>
      <td>88</td>
    </tr>
    <tr>
      <th>직원 1_10월</th>
      <td>11</td>
      <td>2</td>
      <td>4</td>
      <td>17</td>
    </tr>
    <tr>
      <th>직원 2_10월</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>직원 3_10월</th>
      <td>3</td>
      <td>1</td>
      <td>15</td>
      <td>19</td>
    </tr>
  </tbody>
</table>
</div>

```python
tnm_10.draw_merge()
```

![png](output_14_0.png)

```python
tnm_10.get_result()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>employee_name</th>
      <th>Time</th>
      <th>Number</th>
      <th>Magnitude</th>
      <th>TNM Value</th>
      <th>개선점수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>직원 1</td>
      <td>11</td>
      <td>2</td>
      <td>4</td>
      <td>17</td>
      <td>58.3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>직원 2</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>30.1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>직원 3</td>
      <td>3</td>
      <td>1</td>
      <td>15</td>
      <td>19</td>
      <td>56.2</td>
    </tr>
  </tbody>
</table>
</div>

### 가중치의 의미

```python
tnm.get_tnm_model(weights=[0.5,1,2])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>employee_name</th>
      <th>Time</th>
      <th>Number</th>
      <th>Magnitude</th>
      <th>TNM Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>직원 1</td>
      <td>13.0</td>
      <td>8</td>
      <td>120</td>
      <td>141.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>직원 2</td>
      <td>15.0</td>
      <td>1</td>
      <td>4</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>직원 3</td>
      <td>7.0</td>
      <td>4</td>
      <td>140</td>
      <td>151.0</td>
    </tr>
  </tbody>
</table>
</div>
