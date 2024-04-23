import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Trade() {
  const Api = "apikey 18bbvt4R0ZNSfXt6QNVbRt:6EL2kgzugiD4sy9XkE6rGc";
  //const Api1 = "apikey 1KvoXE5NLfHkuNKbgMXmLR:6m5jUXdBXRnqSwnXxi4ycO";
  const Api2 = "apikey 3QFnPhlvL0Bc7W7c8imeDa:4X52g11L50nHGDA4jX1TZM";
  const [ilk, setIlk] = useState("TRY");
  const [ikinci, setIkinci] = useState("USD");
  const [miktar, setMiktar] = useState(1);
  const [sonuc, setSonuc] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.collectapi.com/economy/exchange?int=${miktar}&to=${ikinci}&base=${ilk}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `${Api2}`,
          },
        }
      );
      setSonuc(response.data.result.data[0].calculatedstr);
    } catch (error) {
      console.error("(Trade) Error fetching data:", error);
    }
  };

  const data = [
    { key: "ARS", value: "Argentine Peso" },
    { key: "AUD", value: "Australian Dollar" },
    { key: "BHD", value: "Bahraini Dinar" },
    { key: "BWP", value: "Botswana Pula" },
    { key: "BRL", value: "Brazilian Real" },
    { key: "GBP", value: "British Pound" },
    { key: "BND", value: "Bruneian Dollar" },
    { key: "BGN", value: "Bulgarian Lev" },
    { key: "CAD", value: "Canadian Dollar" },
    { key: "CLP", value: "Chilean Peso" },
    { key: "CNY", value: "Chinese Yuan Renminbi" },
    { key: "COP", value: "Colombian Peso" },
    { key: "HRK", value: "Croatian Kuna" },
    { key: "CZK", value: "Czech Koruna" },
    { key: "DKK", value: "Danish Krone" },
    { key: "AED", value: "Emirati Dirham" },
    { key: "EUR", value: "Euro" },
    { key: "HKD", value: "Hong Kong Dollar" },
    { key: "HUF", value: "Hungarian Forint" },
    { key: "ISK", value: "Icelandic Krona" },
    { key: "INR", value: "Indian Rupee" },
    { key: "IDR", value: "Indonesian Rupiah" },
    { key: "IRR", value: "Iranian Rial" },
    { key: "ILS", value: "Israeli Shekel" },
    { key: "JPY", value: "Japanese Yen" },
    { key: "KZT", value: "Kazakhstani Tenge" },
    { key: "KWD", value: "Kuwaiti Dinar" },
    { key: "LYD", value: "Libyan Dinar" },
    { key: "MYR", value: "Malaysian Ringgit" },
    { key: "MUR", value: "Mauritian Rupee" },
    { key: "MXN", value: "Mexican Peso" },
    { key: "NPR", value: "Nepalese Rupee" },
    { key: "NZD", value: "New Zealand Dollar" },
    { key: "NOK", value: "Norwegian Krone" },
    { key: "OMR", value: "Omani Rial" },
    { key: "PKR", value: "Pakistani Rupee" },
    { key: "PHP", value: "Philippine Peso" },
    { key: "PLN", value: "Polish Zloty" },
    { key: "QAR", value: "Qatari Riyal" },
    { key: "RON", value: "Romanian New Leu" },
    { key: "RUB", value: "Russian Ruble" },
    { key: "SAR", value: "Saudi Arabian Riyal" },
    { key: "SGD", value: "Singapore Dollar" },
    { key: "ZAR", value: "South African Rand" },
    { key: "KRW", value: "South Korean Won" },
    { key: "LKR", value: "Sri Lankan Rupee" },
    { key: "SEK", value: "Swedish Krona" },
    { key: "CHF", value: "Swiss Franc" },
    { key: "TWD", value: "Taiwan New Dollar" },
    { key: "THB", value: "Thai Baht" },
    { key: "TTD", value: "Trinidadian Dollar" },
    { key: "TRY", value: "Turkish Lira" },
    { key: "VES", value: "Venezuelan Bolivar" },
    { key: "USD", value: "US Dollar" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(11,20,27)" }}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Döviz
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            position: "absolute",
            top: 100,
            right: 25,
            zIndex: 2,
          }}
        >
          <View>
            <SelectList
              setSelected={(key) => setIlk(key)}
              data={data}
              placeholder="Turkish Lira"
              searchPlaceholder="Ara"
              inputStyles={{ color: "white" }}
              boxStyles={{
                width: 150,
                backgroundColor: "rgb(27,38,44)",
                borderWidth: 0,
              }}
              dropdownStyles={{
                width: 150,
                backgroundColor: "rgb(27,38,44)",
                borderWidth: 0,
              }}
              dropdownItemStyles={{ borderBottomWidth: 1, borderColor: "gray" }}
              dropdownTextStyles={{ color: "white" }}
              save="key"
            />
          </View>
          <View>
            <MaterialCommunityIcons
              name="transit-connection-horizontal"
              size={40}
              color="rgb(60, 80, 100)"
            />
          </View>
          <View>
            <SelectList
              setSelected={(key) => setIkinci(key)}
              data={data}
              placeholder="US Dollar"
              searchPlaceholder="Ara"
              inputStyles={{ color: "white" }}
              boxStyles={{
                width: 150,
                backgroundColor: "rgb(27,38,44)",
                borderWidth: 0,
              }}
              dropdownStyles={{
                width: 150,
                backgroundColor: "rgb(27,38,44)",
                borderWidth: 0,
              }}
              dropdownItemStyles={{ borderBottomWidth: 1, borderColor: "gray" }}
              dropdownTextStyles={{ color: "white" }}
              save="key"
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 50,
          }}
        >
          <TextInput
            onChangeText={(num) => setMiktar(num)}
            placeholder="Miktar..."
            placeholderTextColor={"gray"}
            style={{
              paddingStart: 10,
              width: 100,
              height: 40,
              borderRadius: 10,
              color: "white",
              backgroundColor: "rgb(27,38,44)",
              marginVertical: 50,
            }}
          />
          <TouchableOpacity
            onPress={fetchData}
            style={{
              width: 100,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              backgroundColor: "rgb(14,239,158)",
            }}
          >
            <Text
              style={{
                color: "rgb(27,38,44)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Hesapla
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 32, fontWeight: 500 }}>
            {sonuc} {ikinci}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            borderWidth: 2,
            borderColor: "rgb(27,38,44)",
            marginVertical: 60,
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Hisse Senedi
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 50,
          }}
        >
          <TextInput
            placeholder="Miktar..."
            placeholderTextColor={"gray"}
            style={{
              paddingStart: 10,
              width: 100,
              height: 40,
              borderRadius: 10,
              color: "white",
              backgroundColor: "rgb(27,38,44)",
              marginVertical: 50,
              marginBottom: 200,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
