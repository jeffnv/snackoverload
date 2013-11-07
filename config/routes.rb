Snackoverload::Application.routes.draw do

  root to: 'questions#index'
  devise_for :users
  resources :users, only: [:show]
  resources :questions
  resources :tags, only: [:index, :show]


end
