import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/providers/auth_provider.dart';
import '../../features/auth/screens/login_screen.dart';
import '../../features/auth/screens/register_screen.dart';
import '../../features/home/screens/home_screen.dart';
import '../../features/video/screens/video_generator_screen.dart';
import '../../features/photai/screens/photai_tools_screen.dart';
import '../../features/admin/screens/admin_screen.dart';
import '../../features/common/screens/splash_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);
  
  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isLoading = authState.isLoading;
      final isAuthenticated = authState.isAuthenticated;
      final isOnAuthPage = state.fullPath == '/login' || state.fullPath == '/register';
      
      // Show splash while loading
      if (isLoading) return '/splash';
      
      // Redirect to login if not authenticated and not on auth page
      if (!isAuthenticated && !isOnAuthPage) return '/login';
      
      // Redirect to home if authenticated and on auth page
      if (isAuthenticated && isOnAuthPage) return '/';
      
      return null;
    },
    routes: [
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/video-generator',
        builder: (context, state) => const VideoGeneratorScreen(),
      ),
      GoRoute(
        path: '/photai-tools',
        builder: (context, state) => const PhotoAIToolsScreen(),
      ),
      GoRoute(
        path: '/admin',
        builder: (context, state) => const AdminScreen(),
      ),
    ],
  );
});