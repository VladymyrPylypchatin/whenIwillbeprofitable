import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getProjectionData } from '../utils/getDataArray';
import Input from '../components/Input/Input';
import { Row, Col, Statistic, Space } from 'antd';




Chart.register(annotationPlugin);

const timeFrame = 50;
const price = 50;
const cac = 100;
const developmentSpend = 14000;
let marketingSpend = 5000;
const churnRate = 0.056;
const marketingGrowthAfterProfit = 0.05;



const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
});

export default function Home() {
  const { register, watch } = useForm({
    // resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      sub_price: 50,
      dev_cost: 15000,
      time_to_market: 5,
      paid_ads: 5000,
      vistor_price: 2.5,
      vistor_to_sign_up: 0.05,
      converstion_trial_to_paid: 0.05,
      user_churn: 0.05,
      word_of_mouth_growth: 0.07,
    }
  });

  const formFields = watch();
  console.log(formFields);

  const { projection, monthsToProfit, monthToReturnMoney, usersToProfit, moneyTillProfit } = getProjectionData({
    timeFrame,
    price: parseFloat(formFields.sub_price),
    developmentSpend: parseFloat(formFields.dev_cost),
    marketingSpend: parseFloat(formFields.paid_ads),
    churnRate: parseFloat(formFields.user_churn),
    cac
  });

  const labels = Array.from(Array(timeFrame)).map((e, i) => i + 1);
  labels.fill(1, timeFrame);

  const data = {
    labels,
    datasets: [
      {
        label: "Expensess",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: projection.map((e) => e.expenses)
      },
      {
        label: "RR",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,89,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: projection.map((e) => e.totalUsers * price)
      }
    ]
  };


  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            value: monthsToProfit - 1,
            borderColor: "red",
            scaleID: 'x',
            label: {
              content: "Time to profit",
              enabled: true,
              position: "top"
            }
          },
          line2: {
            type: "line",
            value: monthToReturnMoney - 1,
            borderColor: "red",
            scaleID: 'x',
            label: {
              content: "Time to return",
              enabled: true,
              position: "top"
            }
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <h2>Line Example</h2>
      <div style={{ position: 'relative', width: 700 }}>
        <Line
          type={'line'}
          data={data}
          options={options}
        />
      </div>
      <Row>
        <Col span={6}>
          <Statistic
            title="Time to profit"
            value={monthsToProfit}
            suffix="months"
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Time to return"
            value={monthToReturnMoney}
            suffix="months"
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Users to become profitable"
            value={usersToProfit}
            suffix="Users"
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Money invested till profit"
            value={moneyTillProfit}
            suffix="USD"
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Space direction="vertical" style={{ width: "100%" }}>

            <Input
              label="Price of the subscription a month"
              name="sub_price"
              register={register}
            />

            <Input
              label="Product development cost a month"
              name="dev_cost"
              register={register}

            />
            <Input
              label="Time to get product to market"
              name="time_to_market"
              register={register}

            />
          </Space>
          {/* </Space> */}
        </Col >
        <Col span={12}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              label="Investment into paid ads"
              prefix="$USD"
              suffix="/mo"
              name="paid_ads"
              register={register}

            />
            <Row>
              <Col span={6}>
                <Input
                  label="Visitors"
                  disabled

                />
              </Col>
              <Col span={18}>
                <Input
                  label="Price of the 1 vistior"
                  name="vistor_price"
                  register={register}

                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Input
                  label="Sign ups"
                  disabled
                />
              </Col>
              <Col span={18}>
                <Input
                  label="Visitor to free tiral converstion rate"
                  name="vistor_to_sign_up"
                  register={register}
                />
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <Input
                  label="Paid subscribers"
                  disabled
                />
              </Col>
              <Col span={18}>
                <Input
                  label="Converstion rate from trial to paid"
                  name="converstion_trial_to_paid"
                  register={register}
                />
              </Col>
            </Row>

            <Input
              label="User Churn"
              name="user_churn"
              register={register}
            />
            <Input
              label="Word of mouth growth"
              name="word_of_mouth_growth"
              register={register}

            />
          </Space>
        </Col>
      </Row >
    </div >
  )
}
