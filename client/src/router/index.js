import { createRouter, createWebHistory } from 'vue-router';
import ArtistList from '../components/ArtistList.vue';
import ArtistDetails from '../components/ArtistDetails.vue';
import AlbumDetails from '../components/AlbumDetails.vue';
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld
    },
    {
        path: '/artists',
        name: 'ArtistList',
        component: ArtistList
    },
    {
        path: '/artist/:id',
        name: 'ArtistDetails',
        component: ArtistDetails,
        props: true
    },
    {
        path: '/artist/:artistId/album/:albumId',
        name: 'AlbumDetails',
        component: AlbumDetails,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
