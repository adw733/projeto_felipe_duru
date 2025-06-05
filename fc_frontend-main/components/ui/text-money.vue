<template>
  <v-text-field
    v-model="model"
    v-bind:label="label"
    v-bind:placeholder="placeholder"
    v-bind:readonly="readonly"
    v-bind:disabled="disabled"
    v-bind:variant="variant"
    v-bind:dense="dense"
    v-bind:error="error"
    v-bind:clearable="clearable"
    v-bind:backgroundColor="backgroundColor"
    v-bind:prefix="options.prefix"
    v-bind:suffix="options.suffix"
    :rules="rules"
    v-on:keypress="keyPress"
    @change="$emit('change')"
  ></v-text-field>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  hideDetails: {
    type: [Boolean, String],
    default: false,
  },
  rules: {
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<
      | "filled"
      | "outlined"
      | "plain"
      | "underlined"
      | "solo"
      | "solo-inverted"
      | "solo-filled"
    >,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "white",
  },
  valueWhenIsEmpty: {
    type: String,
    default: "", // "0" or "" or null
  },
  options: {
    type: Object,
    default: function () {
      return {
        locale: "pt-BR",
        prefix: "",
        suffix: "",
        length: 11,
        precision: 2,
      };
    },
  },
});

// EMIT
const emit = defineEmits(["update:modelValue", "change"]);
const model = computed({
  get() {
    return props.modelValue !== null && props.modelValue !== ""
      ? humanFormat(props.modelValue?.toString())
      : props.valueWhenIsEmpty;
  },
  set(newValue) {
    emit("update:modelValue", machineFormat(newValue));
  },
});

const humanFormat = (number: any) => {
  if (isNaN(number)) {
    return "";
  } else {
    // number = Number(number).toLocaleString(this.options.locale, {maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    number = Number(number).toLocaleString(props.options.locale, {
      maximumFractionDigits: props.options.precision,
      minimumFractionDigits: props.options.precision,
    });
  }
  return number;
};

const machineFormat = (number: any) => {
  if (number) {
    number = cleanNumber(number);
    // Ajustar quantidade de zeros a esquerda
    number = number.padStart(parseInt(props.options.precision) + 1, "0");
    // Incluir ponto na casa correta, conforme a precisÃ£o configurada
    number =
      number.substring(0, number.length - parseInt(props.options.precision)) +
      "." +
      number.substring(
        number.length - parseInt(props.options.precision),
        number.length
      );
    if (isNaN(number)) {
      number = props.valueWhenIsEmpty;
    }
  } else {
    number = props.valueWhenIsEmpty;
  }
  if (props.options.precision === 0) {
    number = cleanNumber(number);
  }
  return number;
};

const keyPress = ($event: any) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
  if (keyCode < 48 || keyCode > 57) {
    // 46 is dot
    $event.preventDefault();
  }
  if (targetLength()) {
    $event.preventDefault();
  }
};

const cleanNumber = (value: any) => {
  let result = "";
  if (value) {
    let flag = false;
    let arrayValue = value.toString().split("");
    for (var i = 0; i < arrayValue.length; i++) {
      if (isInteger(arrayValue[i])) {
        if (!flag) {
          // Retirar zeros a esquerda
          if (i == 0 && arrayValue.length[i] !== "0") {
            result = result + arrayValue[i];
            flag = true;
          }
        } else {
          result = result + arrayValue[i];
        }
      }
    }
  }
  return result;
};

const isInteger = (value: any) => {
  let result = false;
  if (Number.isInteger(parseInt(value))) {
    result = true;
  }
  return result;
};

const targetLength = () => {
  if (
    Number(cleanNumber(props.modelValue).length) >= Number(props.options.length)
  ) {
    return true;
  } else {
    return false;
  }
};
</script>

<style scoped></style>
