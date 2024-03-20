import { Route, createRoutesFromElements, createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/main';
import Logout from '../components/auth/logout';
import GoogleCallback from '../components/auth/login/google/login';
import Register from '../components/auth/register';
import Login from '../components/auth/login';
import PageNotFound from '../components/error';
import Home from '../components/home';
import Category from '../components/category/index';
import Post from '../components/post';
import Profile from '../components/auth/profile';
import WritePost from '../components/post/write';
import PreviewPost from '../components/post/write/preview';
import EditPost from '../components/post/edit';
import TitleSearch from '../components/search/title';
import TagSearch from '../components/search/tag';
import CategoryManagement from '../components/category/page/index';
import Admin from '../components/admin';
import PostManagement from '../components/admin/posts/page';
import UserManagement from '../components/admin/user';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to={"/"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/google-callback" element={<GoogleCallback />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/danh-muc/:slug' element={<Category />} />

            <Route path='/:slug' element={<Post />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/:slug/edit' element={<EditPost />} />
            <Route path='/post' element={<WritePost />} />
            <Route path='/post/preview' element={<PreviewPost />} />
            <Route path='/search' element={<TitleSearch />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/categories' element={<CategoryManagement />} />
            <Route path='/posts' element={<PostManagement />} />
            <Route path='/users' element={<UserManagement />} />
            <Route path='/tag-management' element={<CategoryManagement />} />
            <Route path='/tags/:tags' element={<TagSearch />} />
            <Route path="*" element={<PageNotFound />} />
        </Route>
    )
);