import User from '../../models/user'

export const getAllUsers = (req, res) => {

  if (Object.keys(req.query).length > 0) {

    User.find(
      {
        isActive: true,
        $or:
          [
            { firstName: { $regex: req.query.search, $options: 'i' } },
            { lastName: { $regex: req.query.search, $options: 'i' } },
          ],
      },
      {
        itemId: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
        address: 1,
        imageUrl: 1,
        role: 1,
        isVisible: 1,
        token: 1,
      }
    )
      .exec(async (err, doc) => {

        if (err) return res.boom.badImplementation('', { error: err })
        if (!doc) return res.boom.notFound('Users not found')
        return res.status(200).send({ doc })

      })

  }

  else {

    User.find({ isActive: true }, {
      itemId: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      phone: 1,
      address: 1,
      imageUrl: 1,
      role: 1,
      isVisible: 1,
      token: 1,
    })
      .exec(async (err, doc) => {

        if (err) return res.boom.badImplementation('', { error: err })
        if (!doc) return res.boom.notFound('Users not found')
        return res.status(200).send({ doc })

      })

  }

}

export const getUserById = (req, res) => {

  User.findOne(
    { _id: req.params.id, isActive: true },
    { isActive: 0, oldId: 0 }
  )
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')

      const currentUser = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        token: doc.token,
        email: doc.email,
        phone: doc.phone,
        imageUrl: doc.imageUrl,
        address: doc.address,
        role: doc.role,
        isVisible: doc.isVisible,
      }
      return res.status(200).send({ doc: currentUser })

    })

}

export const putUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')

      const refreshUser = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        imageUrl: doc.imageUrl,
        address: doc.address,
        role: doc.role,
        isVisible: doc.isVisible,
      }
      return res.status(200).send({ message: 'User updated!', doc: refreshUser })

    }
  )

}

export const deleteUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    { isActive: false },
    err => {

      if (err) return res.boom.badImplementation('', { error: err })
      return res.status(200).send({ message: 'User removed!' })

    }
  )

}

export const deleteUserDeep = (req, res) => {

  User.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User deep removed!' })

    }
  )

}
