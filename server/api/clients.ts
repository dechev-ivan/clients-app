import type {ReqResResponse} from "~/types/client";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    const res = await $fetch<ReqResResponse>('https://reqres.in/api/users', {
        headers: {
            'x-api-key': config.REQRES_API_KEY,
        }
    });

    return res.data;


    // моки, чтобы не тратить лимит ключа
    // const users = [
    //     { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth', avatar: 'https://reqres.in/img/faces/1-image.jpg' },
    //     { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver', avatar: 'https://reqres.in/img/faces/2-image.jpg' },
    //     { id: 3, email: 'emma.wong@reqres.in', first_name: 'Emma', last_name: 'Wong', avatar: 'https://reqres.in/img/faces/3-image.jpg' },
    //     { id: 4, email: 'eve.holt@reqres.in', first_name: 'Eve', last_name: 'Holt', avatar: 'https://reqres.in/img/faces/4-image.jpg' },
    //     { id: 5, email: 'charles.morris@reqres.in', first_name: 'Charles', last_name: 'Morris', avatar: 'https://reqres.in/img/faces/5-image.jpg' },
    //     { id: 6, email: 'tracey.ramos@reqres.in', first_name: 'Tracey', last_name: 'Ramos', avatar: 'https://reqres.in/img/faces/6-image.jpg' },
    //     { id: 7, email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson', avatar: 'https://reqres.in/img/faces/7-image.jpg' },
    //     { id: 8, email: 'lindsay.ferguson@reqres.in', first_name: 'Lindsay', last_name: 'Ferguson', avatar: 'https://reqres.in/img/faces/8-image.jpg' },
    //     { id: 9, email: 'tobias.funke@reqres.in', first_name: 'Tobias', last_name: 'Funke', avatar: 'https://reqres.in/img/faces/9-image.jpg' },
    //     { id: 10, email: 'byron.fields@reqres.in', first_name: 'Byron', last_name: 'Fields', avatar: 'https://reqres.in/img/faces/10-image.jpg' },
    //     { id: 11, email: 'george.edwards@reqres.in', first_name: 'George', last_name: 'Edwards', avatar: 'https://reqres.in/img/faces/11-image.jpg' },
    //     { id: 12, email: 'rachel.howell@reqres.in', first_name: 'Rachel', last_name: 'Howell', avatar: 'https://reqres.in/img/faces/12-image.jpg' }
    // ];
    //
    // function shuffle<T>(array: T[]): T[] {
    //     const arr = array.slice();
    //     for (let i = arr.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [arr[i], arr[j]] = [arr[j], arr[i]];
    //     }
    //     return arr;
    // }
    //
    //
    // return new Promise(resolve => {
    //     const delay = 500 + Math.random() * 1000; // 500-1500 мс
    //     const shuffled = shuffle(users);
    //     const length = Math.floor(Math.random() * shuffled.length) + 1; // от 1 до users.length
    //     setTimeout(() => {
    //         resolve(shuffled.slice(0, length));
    //     }, delay);
    // });
})



