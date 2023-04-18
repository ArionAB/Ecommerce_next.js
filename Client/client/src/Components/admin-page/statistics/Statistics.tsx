import { Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Store";
import { selectCurrentUser } from "../../../Store/Selectors/authenticationSelectors";
import { selectStatistics } from "../../../Store/Selectors/statisticsSelectors";
import { getStatistics } from "../../../Store/Thunks/statisticsThunks";
import {
  ConvertFruitTypeToLabel,
  ConvertHoneyType,
  ConvertSizeToLabel,
} from "../../../Utils/Functions/ConvertEnum";
import PieChart from "./PieChart";

import styles from "../../../../styles/pieChart.module.scss";
import { BarChart } from "./BarChart";
import { SalesTable } from "./salesTable";

export const Statistics = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const statistics = useAppSelector(selectStatistics);

  useEffect(() => {
    dispatch(
      getStatistics({
        token: currentUser?.jwtToken,
      })
    );
  }, []);

  return (
    <Container maxWidth="xl">
      <SalesTable data={statistics.salesPerMonth} />
      <Grid container className={styles.container}>
        <Grid>
          <PieChart
            name="Tp miere"
            info={statistics.mostSoldHoneyType?.map((honey: any) => {
              return {
                name: ConvertHoneyType(honey.productCategory),
                value: honey.totalQuantity,
                qty: honey.totalQuantity,
                orders: honey.totalOrders,
              };
            })}
          />
        </Grid>
        <Grid>
          <PieChart
            name="Marime Borcan"
            info={
              statistics.mostSoldSizeType?.map((jar: any) => {
                return {
                  name: ConvertSizeToLabel(jar.sizeType),
                  value: jar.totalQuantity,
                  qty: jar.totalQuantity,
                  orders: jar.totalOrders,
                };
              }) || []
            }
          />
        </Grid>
        <Grid>
          <PieChart
            name="Tip fructe"
            info={statistics.mostSoldFruitType?.map((fruit: any) => {
              return {
                name: ConvertFruitTypeToLabel(fruit.fruitType),
                value: fruit.totalQuantity,
                qty: fruit.totalQuantity,
                orders: fruit.totalOrders,
              };
            })}
          />
        </Grid>
      </Grid>
      <BarChart data={statistics.productSales} />
    </Container>
  );
};
