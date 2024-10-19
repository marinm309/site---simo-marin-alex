from django.urls import path
from .views import CategoryAPIView, SingleCategoryAPIView

urlpatterns = [
    path('', CategoryAPIView.as_view(), name='categories'),
    path('<str:pk>', SingleCategoryAPIView.as_view(), name='subcategories'),
    # path('<str:name>', '', name='')
]