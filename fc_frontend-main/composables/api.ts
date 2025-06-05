import { useUserStore } from "../stores/users/user";

export async function get(rota: string) {
  const { baseURL } = useRuntimeConfig().public;
  const userStore = useUserStore();

  const response = await $fetch(`${baseURL}/${rota}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userStore.getUser().access_token}`,
    },
  });

  return response;
}

export async function getId<T>(rota: string) {
  const { baseURL } = useRuntimeConfig().public;
  const userStore = useUserStore();

  const response = (
    await useLazyFetch(`${baseURL}/${rota}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userStore.getUser().access_token}`,
      },
    })
  ).data as T;

  return response;
  // return (await $fetch(`${baseURL}/${rota}`, {
  //   method: 'GET'
  // })).data;
}

export async function post(rota: string, body: any) {
  const { baseURL } = useRuntimeConfig().public;
  const userStore = useUserStore();

  return await $fetch(`${baseURL}/${rota}`, {
    method: "POST",
    body: body,
    headers: {
      Authorization: `Bearer ${userStore.getUser().access_token}`,
    },
  });
}

export async function put(rota: string, body: any) {
  const { baseURL } = useRuntimeConfig().public;
  const userStore = useUserStore();

  return await $fetch(`${baseURL}/${rota}`, {
    method: "PUT",
    body: body,
    headers: {
      Authorization: `Bearer ${userStore.getUser().access_token}`,
    },
  });
}
