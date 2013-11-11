Snackoverload::Application.routes.draw do


  root to: 'questions#index'
  resources :favorite_tags, only: [:index, :create, :destroy]
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
  get 'guest', to: 'Users#guest_log_in'
end
