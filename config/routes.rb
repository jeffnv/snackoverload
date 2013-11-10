Snackoverload::Application.routes.draw do

  resources :favorite_tags

  root to: 'questions#index'
  devise_for :users
  resources :users, only: [:index, :show]
  resources :questions do
    resources :answers, only:[:create]
  end
  resources :tags, only: [:index, :show]
  resources :answers, only: [:create]
  resources :comments, only: [:create, :destroy]
  get 'about', to: 'StaticPages#about'
  put 'votes', to: 'votes#update'
end
