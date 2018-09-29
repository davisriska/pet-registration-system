<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Pet
 *
 * @property int $id
 * @property string $name
 * @property int $user_id
 * @property int $category_id
 * @property int $address_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereUserId($value)
 * @mixin \Eloquent
 */
class Pet extends Model
{
    //
}
