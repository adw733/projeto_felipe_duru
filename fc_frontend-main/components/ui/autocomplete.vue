<template>
  <i-help
    estilo="width: 100%"
    :help="help"
    :offset-x="offsetX"
    :offset-y="offsetY"
  >
    <v-autocomplete
      ref="autocomplete"
      v-bind="attrs"
      v-model="model"
      v-model:search="modelSearch"
      chips
      class="text-body-1 mt-3"
      :clearable="clearable"
      :custom-filter="() => true"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :label="cLabel"
      :loading="isLoading"
      :multiple="multiple"
      no-data-text="nenhuma opção encontrada"
      placeholder="digite para buscar..."
      :return-object="returnObject"      
      :variant="variant"
      @update:model-value="$emit('change', $event)"
      @update:focused="onFocus"
      @blur="onBlur"
    >
      <template #chip="data"
        ><v-chip
          :ref="`chip${label}`"
          :class="chipClass"
          class="mt-1 mr-2"
          :closable="chipClose"
          :color="data.item.raw.cor"
          dark
          small
          @click:close="clickCloseChip(data.item.raw[itemValue])"
        >
          <span class="text-body-2">
            {{ data.item.raw[itemTitle] }}
          </span>
        </v-chip></template
      >
      <template #selection="data">
        <v-chip
          v-if="lengthLimit"
          :ref="`chip${label}`"
          :class="chipClass"
          class="mt-1 mr-2"
          :closable="chipClose"
          :color="data.item.raw.cor"
          dark
          small
        >
          {{ data.item.raw[itemTitle] }}
        </v-chip>
        <div v-else class="my-2">
          <span class="text-body-2">
            {{ data.item.raw[itemTitle] }}
          </span>
          <v-icon class="ml-1" x-small>mdi-close</v-icon>
        </div>
      </template>
    </v-autocomplete>
  </i-help>
</template>

<script setup lang="ts">
/// PROPS
const props = defineProps({
  arraySearch: { type: Array },
  chipClose: { type: Boolean, default: true },
  clearable: { type: Boolean, default: true },
  help: { type: Object },
  includeSearch: { type: Boolean, default: false },
  itemObject: { type: Boolean, default: true },
  itemsMap: { type: Function },
  itemTitle: { type: String, default: "text" },
  itemValue: { type: String, default: "value" },
  label: { type: String, required: true },
  msg: { type: String },
  multiple: { type: Boolean, default: false },
  panel: { type: Object },
  path: { type: String, required: false },
  persistSelectedItems: { type: Boolean, default: false },
  rejectValues: { type: Array, required: false },
  required: { type: Boolean, default: false },
  returnObject: { type: Boolean, default: false },
  route: { type: String, required: false },
  rules: { type: Array, default: () => [] },
  searchLength: { type: Number, required: false },
  itensIniciais: { type: Array as PropType<Array<any>> },
  variant: {
    type: String as PropType<
      | "underlined"
      | "filled"
      | "outlined"
      | "plain"
      | "solo"
      | "solo-inverted"
      | "solo-filled"
    >,
    default: "filled",
  },
  modelValue: {
    type: [String, Number, Array, Object, null] as PropType<
      string | number | Array<any> | any | null
    >,
    validator(value) {
      return (
        Array.isArray(value) ||
        value === null ||
        Number.isInteger(value) ||
        typeof value === "string" ||
        typeof value === "object"
      );
    },
    required: true,
  },
});
const attrs = useAttrs();

/// EMIT
const emit = defineEmits([
  "update:modelValue",
  "update:itensIniciais",
  "change",
  "changeItem",
]);

/// MODEL
const localModel = ref<any>(props.modelValue);

const model = computed({
  get: function () {
    return localModel.value;
  },
  set: function (newValue) {
    localModel.value = newValue;

    if (!props.multiple) {
      emit("update:modelValue", newValue);
    }

    if (!props.multiple && newValue) {
      setTimeout(() => {
        autocomplete.value?.blur();
      }, 10);

      if (!props.includeSearch) {
        search.value = "";
      }
    }
  },
});

const isFocus = ref<boolean>(false);

const onFocus = (event: any) => {
  isFocus.value = event;
};

const onBlur = () => {
  if (props.multiple) {
    emit("update:modelValue", localModel.value);
  }
};

const modelSearch = computed({
  get: () => {
    return search.value;
  },
  set: (newValue) => {
    search.value = newValue;
  },
});

/// LOADING
const isLoading = ref<boolean>(false);

/// SEARCH
const search = ref<string>("");

watch(search, () => {
  if (!isFocus.value) {
    if (
      !props.path ||
      !search.value?.toString()?.trim() ||
      search.value.toString().length <
        (props.searchLength || 3)
    ) {
      if (items.value.length) {
        const value =
          model && model.value
            ? props.returnObject
              ? model.value[props.itemValue]
              : model.value
            : null;

        items.value = items.value.filter((item: any) => {
          return (
            model.value &&
            (props.multiple
              ? model.value.includes(item[props.itemValue] || item)
              : value === (item[props.itemValue] || item))
          );
        });
      }

      if (
        !props.arraySearch &&
        search.value &&
        props.includeSearch &&
        search.value.toString().length >=
          (props.searchLength || 3)
      ) {
        if (
          items.value.length &&
          !props.multiple &&
          items.value[0][props.itemValue] === 0
        ) {
          if (props.itemObject) {
            items.value[0][props.itemValue] = search.value;
          } else {
            items.value[0] = search.value;
          }
        } else {
          let newItem: any = {};

          if (props.itemObject) {
            newItem[props.itemTitle] = search.value;
            newItem[props.itemValue] = search.value;
          } else {
            newItem = search.value;
          }

          if (
            !items.value.some((item: any) =>
              props.itemObject
                ? item[props.itemValue] === newItem[props.itemValue]
                : item === newItem
            )
          ) {
            items.value.unshift(newItem);
          }
        }
      } else if (
        !props.path &&
        props.arraySearch &&
        (search.value || props.searchLength === 0) &&
        (search.value.toString() || "").length >=
          (props.searchLength ?? 3)
      ) {
        items.value.unshift(
          ...props.arraySearch.filter(
            (item: any) =>
              !search.value ||
              item[props.itemValue]
                .toString()
                .normalizeBr()
                .toUpperCase()
                .includes(
                  search.value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()
                ) ||
              item[props.itemTitle]
                .toString()
                .normalizeBr()
                .toUpperCase()
                .includes(search.value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase())
          )
        );
      }

      if (props.persistSelectedItems) {
        props.itensIniciais?.forEach((item: any) => {
          if (items.value[0].value !== item.value) {
            items.value.push(item);
          }
        });
      }

      return;
    }

    setTimeout(() => {
      if (!isLoading.value && search.value?.toString()?.trim()) {
        isLoading.value = true;

        get(`${props.path}/${search.value}`)
          .then((res: any) => {
            if (items.value) {
              if (!props.multiple) {
                items.value = items.value.filter(
                  (item: any) => item.value === model.value
                );
              }

              let newItems = (res.data || res).filter(
                (newItem: any) =>
                  !items.value
                    .map((item: any) => item[props.itemValue])
                    .includes(newItem[props.itemValue])
              );

              if (props.itemsMap) {
                newItems = props.itemsMap(newItems);
              }
              items.value.unshift(...newItems);

              if (props.includeSearch) {
                if (
                  !items.value.some(
                    (item: any) =>
                      item.value === search.value || item.text === search.value
                  )
                ) {
                  const searchIncluir = {
                    value: search.value,
                    text: search.value,
                  };

                  items.value.unshift(searchIncluir);
                }
              }

              items.value = items.value.filter((item: any) =>
                props.rejectValues
                  ? !props.rejectValues.includes(item[props.itemValue])
                  : true
              );
            } else {
              items.value = (res.data || res).filter((item: any) =>
                props.rejectValues
                  ? !props.rejectValues.includes(item[props.itemValue])
                  : true
              );
            }
          })
          .finally(() => {
            isLoading.value = false;

            if (!props.multiple && props.persistSelectedItems) {
              props.itensIniciais?.forEach((item: any) => {
                if (model.value !== item.value) {
                  items.value.push(item);
                }
              });
            }
          });
      }
    }, 100);
  }

  isFocus.value = false;
});

/// AUTOCOMPLETE
const autocomplete = ref<any>(null);

const lengthLimit = computed(() => {
  return !items.value.some(
    (item: any) => (item.textAlt || item[props.itemTitle] || "").length > 30
  );
});

/// CLASS
const chipClass = computed(() => {
  return props.multiple ? "text-body-2" : "text-body-1";
});

/// LABEL
const cLabel = computed(() => {
  return `${props.label}${props.label && props.required ? " *" : ""}`;
});

/// ITEMS
const itensIniciaisModel = computed({
  get: function () {
    return props.itensIniciais || [];
  },
  set: function (newValue) {
    emit("update:itensIniciais", newValue);
  },
});

const items = ref<Array<any>>(itensIniciaisModel.value);

/// OFFSET
const offsetX = computed(() => {
  return props.help?.offsetX || "8";
});

const offsetY = computed(() => {
  return props.help?.offsetY || "32";
});

/// CLOSE CHIP
const clickCloseChip = (item: any) => {
  model.value = model.value.filter((modelNovo: any) =>
    props.returnObject
      ? modelNovo[props.itemValue] !== item
      : modelNovo !== item
  );
};

/// WATCH SELECTEDITEMS
watch(
  () => props.itensIniciais,
  () => {
    if (model.value) {
      items.value = itensIniciaisModel.value;
    }
  }
);
</script>

<style scoped></style>