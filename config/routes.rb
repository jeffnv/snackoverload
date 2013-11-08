Snackoverload::Application.routes.draw do
  root to: 'questions#index'
  devise_for :users
  resources :users, only: [:show]
  resources :questions do
    resources :answers, only:[:create]
  end
  resources :tags, only: [:index, :show]
  resources :answers, only: [:create]
  resources :comments, only: [:create, :destroy]
  match 'votes', to: 'votes#update'
end
