<script>
import { Line } from "vue-chartjs";
import GET_ALL_TRANSACTIONS from "../../../graphql/queries/getAllTransactions.gql";
import { apolloProvider } from "../../../boot/apollo";
const apollo = apolloProvider.defaultClient;

export default {
  name: "Chart",
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
    };
  },
  created() {
    this.loadTransactions();
  },
  props: {
    transactions: Array,
  },
  // watch: {
  //   transactions(newVal, oldVal) {
  //     category = ["jan"];
  //   },
  // },
  methods: {
    loadTransactions: function() {
      apollo
        .query({
          query: GET_ALL_TRANSACTIONS,
        })
        .then((result) => {
          this.transactions = result.data.getAllTransactions;
          let variableReesult = this.transactions.reduce((object, item) => {
            console.log("object", item);
            console.log("item", item);
            let category = item.category.categoryName;
            let amount = parseInt(item.amount);
            // eslint-disable-next-line no-prototype-builtins
            if (!object.hasOwnProperty(category)) {
              object[category] = parseInt(object.amount);
            }
            console.log("number", amount);
            object[category] += amount;
            return object;
          });
          console.log("resutl", variableReesult);
          return this.transactions;
        });
    },
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [40, 39, 10, 40, 39, 80, 40],
          },
          {
            label: "Data Two",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [60, 55, 32, 10, 2, 12, 53],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>

<style></style>
